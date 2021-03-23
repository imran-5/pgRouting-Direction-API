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
const connect = async () => {
  await pool.connect((err, client, release)=> {
    if (err) {
      return console.error('Error while connecting pool', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
      release();
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log("Database Connected Successfully at Time: ", result.rows[0].now)
    })
  });
};

pool.on('error', (err, client) => {
  // generate error
  console.log(client);
  console.error('idle client error', err.message, err.stack);
});

// pass each query to pool and send back results
const query = async (text, value=[])=> {
  // console.log('query:', text, value);
  const client = await pool.connect();
  try {
    const res = await client.query(text, value);
    // console.log(res)
    return res.rows;
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release();
  }
};

module.exports = {
  pool,
  connect,
  query
}
