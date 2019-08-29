const express = require('express');
const cors = require('cors');
const routing = require('./model/pgRouting');
const { exp_config } = require('./config/config');

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    callback(null, true);
  },
}));
app.get('/', (req, res) => {
  res.send('Welcome to PG Routing API Written in Node JS Express!');
});

app.get('/route', (req, res, next) => {
  const values = req.query;
  const { start } = values;
  const { end } = values;

  routing.route(start, end)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((reason) => {
      res.status(500).json(reason);
    });
});

app.get('/distance', (req, res, next) => {
  const values = req.query;
  const { start } = values;
  const { end } = values;
  routing.distance(start, end)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((reason) => {
      res.status(500).json(reason);
    });
});

app.get('/closest', (req, res, next) => {
  const values = req.query;
  // console.log(values);
  const { lat } = values;
  const { lng } = values;
  const buffer = values.buffer || 1;
  const limit = values.limit || 1;
  routing.closest(lat, lng, buffer, limit)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((reason) => {
      res.status(500).json(reason);
    });
});

app.listen(exp_config.port, () => console.log(`app listening on port ${exp_config.port}!`));
