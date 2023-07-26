import requests
import json
import click
import os
from dotenv import load_dotenv
load_dotenv()

headers = {
    'Authorization': f'Bearer {os.getenv("ADA_API_KEY")}',
    'Content-Type': 'application/json; charset=utf-8',
    'accept': '*/*'
}


@click.command()
@click.option('--id', help="event id")
@click.option('--field', help="field to update")
@click.option('--value', help="new value of field")
def update_event(id, field, value):
    # create event
    body = {
        field: value
    }
    res = requests.patch(f'https://ada.510.global/api/events/{id}', headers=headers, data=json.dumps(body))
    print(res.status_code)

