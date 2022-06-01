# Lost and Found Tec

## Installing

Yarn 1 is required: https://classic.yarnpkg.com/lang/en/docs/install/
Install with ``npm install -g yarn``
On the base of the project type ``yarn install``

## Running

### Prerequisites

1. Start a postgres database (can be within docker with ``docker run --rm -it -p 5432:5432 -e POSTGRES_PASSWORD=test postgres``)
2. Copy the ``.env.example`` into ``.env`` and fill any missing variables
3. Run ``yarn setup-db``

### Development

To run this project you must type ``yarn dev`` and then navigate to ``http://localhost:3000/``

## Building