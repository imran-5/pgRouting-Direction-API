const pg = require('pg');
const {config_db} = require('./config');


var config_connection = {
    host: config_db.host,
    port: config_db.port,
    user: config_db.username,
    password: config_db.password,
    database: config_db.database,
    ssl: config_db.ssl,
    max: config_db.max_client,
    idleTimeoutMillis: config_db.idleTimeoutMillis,
    connectionTimeoutMillis: config_db.connectionTimeoutMillis
};

// initializing connection pool according to the config setup
const pool = new pg.Pool(config_connection);

pool.on('error', function (err, client) {
    // generate error
    console.error('idle client error', err.message, err.stack)
})

//pass each query to pool
module.exports.query = function (text, values, callback) {
    console.log('query:', text, values);
    return pool.query(text, values, callback);
};

// check the connection
module.exports.connect = function (callback) {
    return pool.connect(callback);
};