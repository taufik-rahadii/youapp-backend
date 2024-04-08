##  YouApp Backend Coding Test

## Project Structure
- Application
  
    This directory contains the main business flow of this application. Inside the application directory, we divide the modules exists based on its context. Each modules may have DTO, Controller, Services, Repositories, Models and IOC Container itself.
- Core

  This directory contains the Nestjs fundamental things like Guard, Interceptor, Decorator, Validator, etc.
- Storage (deprecated)
- Utils

  This directory contains some utility functions.


## Installation

```bash
# using pnpm
$ pnpm install

# using npm
$ npm i

# using yarn
$ yarn
```

## Running the app

 __After you've done filling env variables needed, then run this command below to start the app.__
 
```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## API Docs (Swagger)
open your browser and access the endpoint `/api-docs`.
