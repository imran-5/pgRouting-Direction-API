const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const { route, closest, distance, topology } = require('./src/pgRouting');
const { exp_config } = require('./src/config');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.send('Welcome to PG Routing API Written in Node JS Express!');
});

app.get('/api/route', async (req, res, next) => {

  const { start, end } = req.query;
  route(start, end)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((reason) => {
      res.status(500).json(reason);
    });
});

app.get('/api/distance', async (req, res, next) => {
  const { start, end } = req.query;
  distance(start, end)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((reason) => {
      res.status(500).json(reason);
    });
});

app.get('/api/closest', async (req, res, next) => {
  const { lat, lng } = req.query;
  const buffer = values.buffer || 1;
  const limit = values.limit || 1;
  closest(lat, lng, buffer, limit)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((reason) => {
      res.status(500).json(reason);
    });
});

app.get('/api/topology', async (req, res, next) => {
  topology()
    .then((result) => {
      res.status(200).json({ result: "Okay" });
    })
    .catch((reason) => {
      res.status(500).json(reason);
    });
});

app.listen(exp_config.port, () => console.log(`app listening on port ${exp_config.port}!`));
