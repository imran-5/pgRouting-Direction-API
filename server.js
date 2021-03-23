const express = require('express');
const cors = require('cors');
const {route, closest, distance} = require('./src/pgRouting');
const { exp_config } = require('./src/config');

// use nodemon no need to use webpack-hot-middleware and webpackDevMiddleware for express
//
// import webpackDevMiddleware from 'webpack-dev-middleware'
// import config from '../webpack.config'
// import webpackHotMiddleware from 'webpack-hot-middleware'
// import webpack from 'webpack'

const app = express();
// const compiler = webpack(config);
app.use(cors({
  origin: (origin, callback) => {
    callback(null, true);
  },
}));

// use nodemon no need to use webpack-hot-middleware and webpackDevMiddleware for express
// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath
// }));
// app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
  res.send('Welcome to PG Routing API Written in Node JS Express!');
});

app.get('/route', async(req, res, next) => {

  const { start, end } = req.query;
  route(start, end)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((reason) => {
      res.status(500).json(reason);
    });
});

app.get('/distance', async(req, res, next) => {
  const { start, end } = req.query;
  distance(start, end)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((reason) => {
      res.status(500).json(reason);
    });
});

app.get('/closest', async(req, res, next) => {
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

app.listen(exp_config.port, () => console.log(`app listening on port ${exp_config.port}!`));
