# API Therapy

## Project setup

```bash
$ npm install
```

## Compile and run the project

### Setup docker compose containers

You will neet to have docker and docker-compose installed and running

```bash
# development
$ docker-compose up

```

### Migrate data into database

```bash
# development
$ npm run migrate:up

```

### Start API service

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

Then the API's swagger will be accessible at

> http://localhost:3000/swagger

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Todo

- [ ] Validate professional subscription by email or whatsapp
