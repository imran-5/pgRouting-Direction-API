// setup your server and database
if (process.env.NODE_ENV !== "production") {
  // configure dotenv
  require("dotenv").config();

}
const host = process.env.PGHOST; // localhost
const port  = process.env.PGPORT; // env variable: PGPORT or setup here
const username  = process.env.PGUSER; // env variable: PGUSER or setup here
const password  = process.env.PGPASS; // env variable: PGPASSWORD or setup here
const database  = process.env.PGDB; // env variable: PGDATABASE or setup here

const ssl  = process.env.PGSSL; // setup ssl for database
const max_client = 500; // max number of clients in the pool
// how long a client is allowed to remain idle before being closed
const idleTimeoutMillis = 30000;
// return an error after 1 second if connection could not be established
const connectionTimeoutMillis = 30000;


// set express server port
const port = process.env.PORT;

// PostGIS/pgRouting table name, vertices_table_name, input_points_srid, output_geom_srid//

const table = process.env.LINE_TABLE;
const vertices_table = process.env.VERTICES_TABLE;
const input_srid = process.env.INPUT_SRID;
const output_srid = process.env.OUTPUT_SRID;

exports.config_db = {
  host,
  port,
  username,
  password,
  database,
  ssl,
  max_client,
  idleTimeoutMillis,
  connectionTimeoutMillis,
};

exports.exp_config = { port };

exports.config_pg = {
  table, vertices_table, input_srid, output_srid,
};
