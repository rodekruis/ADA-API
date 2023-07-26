import json
import geopandas as gpd
import click
import os
import requests
from dotenv import load_dotenv
load_dotenv()

headers = {
    'Authorization': f'Bearer {os.getenv("ADA_API_KEY")}',
    'Content-Type': 'application/json; charset=utf-8',
    'accept': '*/*'
}


@click.command()
@click.option('--event', help="event name")
@click.option('--data', help="input data dir")
@click.option('--countryname', help="country name")
@click.option('--date', help="event date in ISO 8601 format (2023-02-11)")
@click.option('--builddamage', default=None, help="vector file with building damage")
@click.option('--popdensity', default=None, help="vector file with population density")
@click.option('--adminlevellabels', default="Region,Province,Municipality", help="comma-separated admin level names")
def create_new_event(event, data, countryname, date, builddamage, popdensity, adminlevellabels):

    if builddamage is None:
        builddamage = os.path.join(data, 'buildings-predictions.geojson')
    gdf = gpd.read_file(builddamage)

    if popdensity is None:
        popdensity = os.path.join(data, 'population-density.geojson')
    gdfpop = gpd.read_file(popdensity)

    gdf_area = gpd.read_file(os.path.join(data, 'assessment-area.geojson'))
    gdf_area['is_area'] = True
    pos = gdf.dissolve().centroid

    # compute total damage, i.e. aggregated over the whole assessment area
    total_damaged = len(gdf[gdf['damage'] > 0])
    total_damaged_perc = round(total_damaged / len(gdf), 2)
    gdfpop = gdfpop.overlay(gdf_area, how='intersection')
    gdfpop = gdfpop[gdfpop['is_area']]
    total_pop = gdfpop['population_density'].sum()
    total_pop_affected = int(total_damaged_perc * total_pop)
    total_pop_affected_perc = total_damaged_perc

    # create event
    body = {
        "name": event,
        "type": "Tropical Cyclone",
        "country": countryname,
        "geometry": {
            "type": "Point",
            "coordinates": [
                pos.y.values[0],
                pos.x.values[0]
            ]
        },
        "startDate": date,
        "endDate": date,
        "access": "Public",
        "peopleAffected": total_pop_affected,
        "peopleAffectedPercentage": total_pop_affected_perc,
        "buildingsDamaged": total_damaged,
        "buildingsDamagedPercentage": total_damaged_perc,
        "adminLevelLabels": adminlevellabels,
        "code": "password"
    }
    print(body)
    res = requests.post('https://ada.510.global/api/events', headers=headers, data=json.dumps(body))
    res_json = json.loads(res.content)
    if 'id' in res_json.keys():
        id_ = res_json['id']
        print(f"Created new event {id_}")
    else:
        print(res)
        raise ValueError

    # upload all layers
    for layer_file in [file for file in os.listdir(data) if file.endswith('.geojson')]:
        with open(os.path.join(data, layer_file)) as f:
            layer = layer_file.replace('.geojson', '')
            try:
                layer_data = json.load(f)
                request_body = {}
                request_body['geojson'] = layer_data
                request_body['information'] = f"Placeholder: information for layer {layer}"
                res = requests.post(f'https://ada.510.global/api/events/{id_}/layers/{layer}', headers=headers,
                                    data=json.dumps(request_body))
                print(f"Uploaded layer {layer}: {res.status_code}")
            except json.decoder.JSONDecodeError:
                print(f"Failed to upload layer {layer}")


if __name__ == '__main__':
    create_new_event()
