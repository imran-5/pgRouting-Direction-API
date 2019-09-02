const pg = require('pg/lib');
const { config_db } = require('./config');

const config_connection = {
  host: config_db.host,
  port: config_db.port,
  user: config_db.username,
  password: config_db.password,
  database: config_db.database,
  ssl: config_db.ssl,
  max: config_db.max_client,
  idleTimeoutMillis: config_db.idleTimeoutMillis,
  connectionTimeoutMillis: config_db.connectionTimeoutMillis,
};

// initializing connection pool according to the config setup
const pool = new pg.Pool(config_connection);

// check the connection
const connect = function (callback) {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log("database poll connection successful at "+ result.rows[0].now)
    })
  })
  return pool.connect(callback);
};
// first time connect;
connect();
pool.on('error', (err, client) => {
  // generate error
  console.log(client);
  console.error('idle client error', err.message, err.stack);
});

// pass each query to pool
const query = function (text, values, callback) {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};

module.exports = {
  pool,
  connect,
  query
}