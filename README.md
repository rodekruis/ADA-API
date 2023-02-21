# [ADA-API - API for Automated Damage Assessment](https://ada.510.global/api/swagger)

This code repository contains the REST application programming interface (API) for the Automated Damage Assessment (ADA) project.

The API provides the data visualized by [ADA-UI](https://github.com/rodekruis/ADA-UI) on [a map view](https://ada.510.global).

A disaster manager can programmatically retrieve data using the api to consider in their disaster response activities.

## API Specification

Open-API documentation is at [/swagger](https://ada.510.global/api/swagger).

ADA-API Postman Collection is available [here](./docs/ADA-API.postman_collection.json).

The following sections describe the data structure representations of **Event** and **Event Layer**. For troubleshooting, go to the [FAQ](https://github.com/rodekruis/ADA-UI#frequently-asked-questions) in the [ADA-UI README](https://github.com/rodekruis/ADA-UI/blob/main/README.md).

### How to represent a disaster event (Event)?

```json
{
    "name": "Irma", // string
    "type": "Tropical Cyclone", // Tropical Cyclone, Conflict, Eruption, Earthquake, Fire, Flood, Heavy Rain, Landslide, Tsunami
    "country": "Sint-Maarten", // string
    "geometry": {
        "type": "Point",
        "coordinates": [18.0291075, -63.0591] // [ latitude, longitude ]
    },
    "startDate": "2022-12-31", // yyyy-mm-dd
    "endDate": "2023-12-31", // yyyy-mm-dd
    "access": "Public", // Public, Restricted
    "peopleAffected": 0, // integer
    "buildingsDamaged": 0, // integer
    "buildingsDamagedPercentage": 0, // float (0.0 - 1.0)
    "adminLevelLabels": "Province,District,Municipality", // comma separated strings
    "code": "secret" // string
}
```

### How to represent a disaster event layer (Event Layer)?

```json
{
    "geojson": {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "building_damage": 123, // integer used by admin layers
                    "building_damage_percentage": 0.45, // float (0.0 - 1.0) used by admin layers
                    "people_affected": 6789, // integer used by admin layers
                    "population_density": 42, // integer used by population-density layer
                    "rwi": 0.2 // float (-10.0 to 10.0) used by wealth-index layer
                },
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            [
                                [95, 216],
                                [241, 253],
                                [175, 138],
                                [95, 216]
                            ]
                        ]
                    ]
                }
            }
        ]
    },
    "information": "Any text or markdown information
        to help understand the layer. For example,
        the layer data geojson was sourced
        from **Humanitarian Data Exchange (HDX)**
        https://data.humdata.org/ on 30-02-2023." // string (ADA-UI supports markdown)
}
```

### How is sensitive data protected?

Protected APIs are accessible by providing a [Bearer](https://swagger.io/docs/specification/authentication/bearer-authentication/) token in the HTTP request.

### How to access the restricted data?

-   Admin access is granted by using `ADMIN_CODE` (see [ENVIRONMENT](./docs/ENVIRONMENT.md)) as token.
    -   Required to Create Event, Update Event, Delete Event, Create Event Layer, and Delete Event Layer.
-   Event read access is granted by using the response from [POST /events/{id}/code](https://ada.510.global/api/swagger/#/event-code/EventController_code) as token.
    -   POST body should send the `code` set for event with id {id}.
    -   Required to Read Restricted Event, and Read Restricted Event Layer.

## Installation

```bash
$ npm install
```

Set the environment variables as described in [ENVIRONMENT](./docs/ENVIRONMENT.md).

Refer [docker-compose.yml](./docker-compose.yml) for Docker setup.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

This project is open source under the [MIT LICENSE](./LICENSE).

## Support

Write to us at [support@510.global](mailto:support@510.global).
