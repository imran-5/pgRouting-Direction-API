# pgRouting-API  [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Imran-5/pgRouting-Direction-API/blob/master/LICENSE)

A complete solution of pgRouting direction API written in Node js.

## Setup

- edit `.env` file according to your postgres connection, pgRouting table name and express js settings.
 
- *if your pgrouting database table schema/name of columns is different, you have to change the query schema in `src/pgrouting.js`
 
## Install Modules

`npm install`


## Start Development Server

`npm start`



## API Request Example
 * http://localhost:3000/api
 * http://localhost:3000/api/route?start=3078473.56,8206254.21&end=2780495.14,8423917.64
 * http://localhost:3000/api/closest?lat=3078473.56&lng=8206254.21&buffer=3000000&limit=1
 * http://localhost:3000/api/distance?start=3078473.56,8206254.21&end=2780495.14,8423917.64
 
 
### Todo:
* Way Points
* Docker
* Handle other pgRouting capabilities.
