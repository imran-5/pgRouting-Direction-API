# pgRouting-Web-API Written In Node JS Express (Javascript)

A Complete Solution of PgRouting Directions Web API written in Node js (Javascript) Express

Setup
 *edit config file according to your pgrouting schema
 
 *if your pgrouting column names are different then you have to change in model/pgrouting.
 
#install modules

```npm install```


#Start Server

 ``node server.js``


API Request-Example
 * http://localhost:3000
 * http://localhost:3000/route?start=537466,6553539&end=387577,6665207
 * http://localhost:3000/closest?lat=537466&lng=6553539&buffer=3000000&limit=1
 * http://localhost:3000/distance?start=537466,6553539&end=387577,6665207
 
 
Improvement will come soon for way points/stops and other PgRouting Capabilities.
 
Thanks.
