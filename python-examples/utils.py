from typing import Optional, Union
from osgeo import ogr
import geopandas as gpd
from sqlalchemy import create_engine
import os
import requests
from osgeo import gdal
import rasterio
from rasterio.errors import DatasetIOShapeError
import numpy as np
from dotenv import load_dotenv
load_dotenv()

engine = create_engine(
    f"postgresql://{os.getenv('SQL_USERNAME')}@510-postgresql-flex-server:{os.getenv('SQL_PASSWORD')}"
    f"@510-postgresql-flex-server.postgres.database.azure.com:5432/global510")


def get_worldpop_data(base_url, model, country, filename, filepath):
    r = requests.get(f"{base_url}/{model}/{country.upper()}/{filename}")
    with open(filepath, "wb") as file:
        file.write(r.content)


def crop_raster(infile, outfile, xmin, ymin, xmax, ymax):
    src = rasterio.open(infile, "r")
    window = src.window(xmin, ymin, xmax, ymax)
    try:
        raster = src.read(
            window=window,
            boundless=True,
            fill_value=np.nan
        )
    except DatasetIOShapeError:
        pass

    # update the profile with the new shape and affine transform
    profile = src.meta.copy()
    profile.update(height=window.height,
                   width=window.width,
                   transform=rasterio.windows.transform(window, src.transform)
                   )

    with rasterio.open(outfile, "w", **profile) as dst:
        dst.write(raster)


def get_extra_data(country, dest, adm, pop, rwi, ext):
    """get additional layers: admin boundaries, population, wealth index"""
    crop = False
    if ext != "" and os.path.exists(ext):
        crop = True
        gdf_ext = gpd.read_file(ext)
        gdf_ext = gdf_ext.to_crs("EPSG:4087").buffer(10000, cap_style=3).to_crs("EPSG:4326")
        xmin, ymin, xmax, ymax = gdf_ext.total_bounds
        print(f"getting extra data and cropping around {ext}")
    else:
        print(f"getting extra data")

    results_dict = {}
    if adm:
        for level in [1, 2, 3]:
            print(f"Getting admin boundaries level {level}")
            try:
                sql = f"SELECT geometry, name FROM admin_boundaries.{country.lower()}_adm{level}"
                gdf = gpd.GeoDataFrame.from_postgis(sql, engine, geom_col="geometry")
                if crop:
                    gdf = gdf.cx[xmin:xmax, ymin:ymax]
                gdf.to_file(os.path.join(dest, f"admin-boundaries-{level}.geojson"), driver="GeoJSON")
                results_dict[f"adm{level}"] = os.path.join(dest, f"admin-boundaries-{level}.geojson")
            except:
                print(f"WARNING: no Administrative Boundaries at level {level} found")
    if rwi:
        print(f"Getting relative wealth index")
        try:
            sql = f"SELECT geometry, rwi, error FROM relative_wealth_index.{country.lower()}_rwi_2021"
            gdf = gpd.GeoDataFrame.from_postgis(sql, engine, geom_col="geometry")
            if crop:
                gdf = gdf.cx[xmin:xmax, ymin:ymax]
            gdf.to_file(os.path.join(dest, "wealth-index.geojson"), driver="GeoJSON")
            results_dict["rwi"] = os.path.join(dest, "wealth-index.geojson")
        except:
            print("WARNING: no Relative Wealth Index found")
    if pop:
        print(f"Getting population density")
        base_url = "https://data.worldpop.org/GIS/Population/Global_2000_2020_Constrained/2020"
        filename = f"{country.lower()}_ppp_2020_UNadj_constrained.tif"
        filepath = os.path.join(dest, filename.lower())
        try:
            get_worldpop_data(base_url, "BSGM", country, filename, filepath)
            if os.path.getsize(filepath) < 1000:
                get_worldpop_data(base_url, "maxar_v1", country, filename, filepath)
        except:
            print("WARNING: Population Density download failed")

        if os.path.exists(filepath):
            if crop:
                if os.path.exists(filepath.replace('.tif', '_crop.tif')):
                    os.remove(filepath.replace('.tif', '_crop.tif'))
                crop_raster(filepath, filepath.replace('.tif', '_crop.tif'), xmin, ymin, xmax, ymax)
                filepath = filepath.replace('.tif', '_crop.tif')
            try:
                filepath_vector = os.path.join(dest, "population-density.geojson")
                if os.path.exists(filepath_vector):
                    os.remove(filepath_vector)
                gdal_polygonize(src_filename=filepath, dst_filename=filepath_vector, driver_name="GeoJSON")
                gdf = gpd.read_file(filepath_vector)
                gdf = gdf.rename(columns={'DN': 'population_density'})
                gdf = gdf[gdf['population_density'] > 0]
                gdf.to_file(filepath_vector)
                results_dict["pop"] = filepath_vector
            except:
                print('gdal_polygonize failed')

    return results_dict


def compute_aggregated_damage(build, adm, dest):
    """compute total building damage per admin division"""
    gdf_build = gpd.read_file(build)
    gdf_build.to_crs("EPSG:3857", inplace=True)
    gdf_build['damage'] = gdf_build['damage'].fillna(0)
    # simplify from polygon to point
    gdf_build['geometry'] = gdf_build['geometry'].centroid
    num_build = len(gdf_build)
    print(gdf_build.head())

    select_from = 1

    gdf_adm = gpd.read_file(adm)
    crs_original = gdf_adm.crs
    gdf_adm.to_crs("EPSG:3857", inplace=True)

    for ix, row in gdf_adm.iterrows():
        print(f'starting {ix}/{len(gdf_adm)}')

        xmin, ymin, xmax, ymax = gpd.GeoDataFrame({'geometry': [row['geometry']]}, crs="EPSG:3857").total_bounds
        gdf_build_ = gdf_build.cx[xmin:xmax, ymin:ymax]
        print(f'done cx: {num_build} --> {len(gdf_build_)}')

        # inters = gdf_build['geometry'].apply(lambda x: x.within(row['geometry']))
        inters = gdf_build_['geometry'].intersects(row['geometry'])
        gdf_build_filtered = gdf_build_[inters]
        print(f'done intersect: {len(gdf_build_)} --> {len(gdf_build_filtered)}')

        if len(gdf_build_filtered) > 0:
            inters_damaged = gdf_build_filtered[gdf_build_filtered['damage'] >= select_from]
            gdf_adm.at[ix, 'building_damage'] = len(inters_damaged)
            gdf_adm.at[ix, 'building_damage_percentage'] = len(inters_damaged)/len(gdf_build_filtered)
        else:
            gdf_adm.at[ix, 'building_damage'] = 0
            gdf_adm.at[ix, 'building_damage_percentage'] = 0

    gdf_adm.to_crs(crs_original, inplace=True)
    if dest.endswith('.geojson'):
        gdf_adm.to_file(dest, driver="GeoJSON")
    elif dest.endswith('.gpkg'):
        gdf_adm.to_file(dest, driver="GPKG")
    else:
        raise ValueError("file format not recognized")


def gdal_polygonize(src_filename: Optional[str] = None, band_number: Union[int, str] = 1,
                    dst_filename: Optional[str] = None, driver_name: Optional[str] = None,
                    dst_layername: Optional[str] = None, dst_fieldname: Optional[str] = None,
                    quiet: bool = False, mask: str = 'default', options: Optional[list] = None,
                    connectedness8: bool = False):
    """convert raster to vector"""
    if isinstance(band_number, str) and not band_number.startswith('mask'):
        band_number = int(band_number)

    options = options or []

    if connectedness8:
        options.append('8CONNECTED=8')

    if driver_name is None:
        raise ValueError

    if dst_layername is None:
        dst_layername = 'out'

    # =============================================================================
    # Open source file
    # =============================================================================

    src_ds = gdal.Open(src_filename)

    if src_ds is None:
        print('Unable to open %s' % src_filename)
        return 1

    if band_number == 'mask':
        srcband = src_ds.GetRasterBand(1).GetMaskBand()
        # Workaround the fact that most source bands have no dataset attached
        options.append('DATASET_FOR_GEOREF=' + src_filename)
    elif isinstance(band_number, str) and band_number.startswith('mask,'):
        srcband = src_ds.GetRasterBand(int(band_number[len('mask,'):])).GetMaskBand()
        # Workaround the fact that most source bands have no dataset attached
        options.append('DATASET_FOR_GEOREF=' + src_filename)
    else:
        srcband = src_ds.GetRasterBand(band_number)

    if mask == 'default':
        maskband = srcband.GetMaskBand()
    elif mask == 'none':
        maskband = None
    else:
        mask_ds = gdal.Open(mask)
        maskband = mask_ds.GetRasterBand(1)

    # =============================================================================
    #       Try opening the destination file as an existing file.
    # =============================================================================

    try:
        gdal.PushErrorHandler('CPLQuietErrorHandler')
        dst_ds = ogr.Open(dst_filename, update=1)
        gdal.PopErrorHandler()
    except:
        dst_ds = None

    # =============================================================================
    # 	Create output file.
    # =============================================================================
    if dst_ds is None:
        drv = ogr.GetDriverByName(driver_name)
        if not quiet:
            print('Creating output %s of format %s.' % (dst_filename, driver_name))
        dst_ds = drv.CreateDataSource(dst_filename)

    # =============================================================================
    #       Find or create destination layer.
    # =============================================================================
    try:
        dst_layer = dst_ds.GetLayerByName(dst_layername)
    except:
        dst_layer = None

    dst_field: int = -1
    if dst_layer is None:

        srs = src_ds.GetSpatialRef()
        dst_layer = dst_ds.CreateLayer(dst_layername, geom_type=ogr.wkbPolygon, srs=srs)

        if dst_fieldname is None:
            dst_fieldname = 'DN'

        fd = ogr.FieldDefn(dst_fieldname, ogr.OFTInteger)
        dst_layer.CreateField(fd)
        dst_field = 0
    else:
        if dst_fieldname is not None:
            dst_field = dst_layer.GetLayerDefn().GetFieldIndex(dst_fieldname)
            if dst_field < 0:
                print("Warning: cannot find field '%s' in layer '%s'" % (dst_fieldname, dst_layername))

    # =============================================================================
    # Invoke algorithm.
    # =============================================================================

    if quiet:
        prog_func = None
    else:
        prog_func = gdal.TermProgress_nocb

    result = gdal.Polygonize(srcband, maskband, dst_layer, dst_field, options,
                             callback=prog_func)

    srcband = None
    src_ds = None
    dst_ds = None
    mask_ds = None

    return result
