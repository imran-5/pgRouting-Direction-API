// setup your server and database

let host='localhost'; // localhost
let port=5434; //env variable: PGPORT or setup here
let username='postgres'; //env variable: PGUSER or setup here
let password='postgres'; //env variable: PGPASSWORD or setup here
let database='pgrouting_new'; //env variable: PGDATABASE or setup here
let ssl=false; // setup ssl for database
let max_client=500; // max number of clients in the pool
let idleTimeoutMillis=30000; // how long a client is allowed to remain idle before being closed
let connectionTimeoutMillis= 30000; // return an error after 1 second if connection could not be established


// set express server port
let port_exp=3000;


//PostGIS/pgRouting table name, vertices_table_name, input_points_srid, output_geom_srid//

let table='line_1';
let vertices_table='line_1_vertices_pgr';
let input_srid='3067';
let output_srid='3857';



exports.config_db={'host': host, 'port': port, 'username': username, 'password': password, 'database': database,
    'ssl': ssl, 'max_client': max_client, 'idleTimeoutMillis': idleTimeoutMillis, 'connectionTimeoutMillis': connectionTimeoutMillis};

exports.exp_config = {port: port_exp};

exports.config_pg={table: table, vertices_table: vertices_table, input_srid, input_srid, output_srid: output_srid};