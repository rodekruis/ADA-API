import os
from shapely.geometry import box
import geopandas as gpd
import click
from utils import get_extra_data, compute_aggregated_damage


@click.command()
@click.option('--data', help="input data dir")
@click.option('--country', help="country ISO3")
@click.option('--builddamage', default=None, help="vector file with building damage")
@click.option('--assessmentarea', default=None, help="vector file with assessment area")
def prepare_event_layers(data, country, builddamage, assessmentarea):

    os.makedirs(data, exist_ok=True)

    if builddamage is None:
        builddamage = os.path.join(data, 'buildings-predictions.geojson')
    gdf = gpd.read_file(builddamage)

    if assessmentarea is None:
        if not os.path.exists(os.path.join(data, 'assessment-area.geojson')):
            # create assessment area based on extent of builddamage
            gdf_assessmentarea = gpd.GeoSeries([box(*gdf.total_bounds)])
            gdf_assessmentarea.to_file(os.path.join(data, 'assessment-area.geojson'))
        assessmentarea = os.path.join(data, 'assessment-area.geojson')

    # split damage levels
    gdf.drop(columns=['damage']).to_file(os.path.join(data, 'buildings.geojson'))
    for ix, damage_level in enumerate(['none', 'light', 'moderate', 'heavy']):
        gdf[gdf['damage'] == ix].to_file(os.path.join(data, f'buildings-damage-{damage_level}.geojson'))

    # get available extra data (population, admin boundaries, etc.)
    layers_paths = get_extra_data(country, dest=data, adm=True, pop=True, rwi=True, ext=assessmentarea)

    # compute aggregated damage per admin division
    for level in range(1, 4):
        layers_path = os.path.join(data, f"admin-boundaries-{level}.geojson")
        if os.path.exists(layers_path):
            compute_aggregated_damage(builddamage, adm=layers_path,
                                      dest=layers_path.replace('boundaries-', ''))


if __name__ == '__main__':
    prepare_event_layers()

