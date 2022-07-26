# ADA-API

API for Automated Damage Assessment

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

Open-API documentation is at [/swagger](http://localhost:3000/swagger).

ADA-API Postman Collection is available [here](./docs/ADA-API.postman_collection.json).

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Authentication and Authorization

Protected APIs are accessible by providing a [Bearer](https://swagger.io/docs/specification/authentication/bearer-authentication/) token in the HTTP request.

-   Admin access is granted by using `ADMIN_CODE` (see [ENVIRONMENT](./docs/ENVIRONMENT.md)) as token.
    -   Required to Create Event, Update Event, Delete Event, Create Event Layer, and Delete Event Layer.
-   Event read access is granted by using the response from [POST /events/{id}/code](http://localhost:3000/swagger/#/event-code/EventController_code) as token.
    -   POST body should send the `code` set for event with id {id}.
    -   Required to Read Private Event, and Read Private Event Layer.

## License

This project is open source under the [MIT LICENSE](./LICENSE).

## Support

Write to us at [support@510.global](mailto:support@510.global).
