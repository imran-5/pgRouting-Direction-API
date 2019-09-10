// setup your server and database

const host = 'localhost'; // localhost
const port = 5434; // env variable: PGPORT or setup here
const username = 'postgres'; // env variable: PGUSER or setup here
const password = 'postgres'; // env variable: PGPASSWORD or setup here
const database = 'pgrouting_new'; // env variable: PGDATABASE or setup here
const ssl = false; // setup ssl for database
const max_client = 500; // max number of clients in the pool
// how long a client is allowed to remain idle before being closed
const idleTimeoutMillis = 30000;
// return an error after 1 second if connection could not be established
const connectionTimeoutMillis = 30000;


// set express server port
const port_exp = 3000;

// PostGIS/pgRouting table name, vertices_table_name, input_points_srid, output_geom_srid//

const table = 'line';
const vertices_table = 'line_vertices_pgr';
const input_srid = '4326';
const output_srid = '4326';


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

exports.exp_config = { port: port_exp };

exports.config_pg = {
  table, vertices_table, input_srid, input_srid, output_srid,
};
