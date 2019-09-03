# pgRouting-Web-API Written In Node JS Express (Javascript)

A complete solution of PgRouting direction Web API written in Node js (Javascript) Express

## Setup

- edit `src/config/config.js` file according to your postgres connection, pgRouting table name and express js settings.
 
- *if your pgrouting database table schema/name of columns is different, you have to change the query schema in `src/model/pgrouting.js`
 
## Install Modules

`npm install`


## Start Development Server

`npm start`



## API Request Example
 * http://localhost:3000
 * http://localhost:3000/route?start=3078473.56,8206254.21&end=2780495.14,8423917.64
 * http://localhost:3000/closest?lat=3078473.56&lng=8206254.21&buffer=3000000&limit=1
 * http://localhost:3000/distance?start=3078473.56,8206254.21&end=2780495.14,8423917.64
 
 
App is underdevelopment:
* way points
* docker
* handle other pgRouting capabilities.
 
# Thanks.
