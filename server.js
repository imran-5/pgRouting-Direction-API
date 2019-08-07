const express = require('express');
const routing = require('./model/pgRouting');
const {exp_config} = require('./config/config');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: (origin, callback) => {
        callback(null, true);
    }
}));
app.get('/', (req, res) => {
    res.send('Welcome to PG Routing API Written in Node JS Express!');
});

app.get('/route', (req, res, next) => {

    let values = req.query;
    let start = values.start;
    let end = values.end;

    routing.route(start, end)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(reason => {
            res.status(500).json(reason);
        });
});

app.get('/distance', (req, res, next) => {
    let values = req.query;
    let start = values.start;
    let end = values.end;
    routing.distance(start, end)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(reason => {
            res.status(500).json(reason);
        });
});

app.get('/closest', (req, res, next) => {
    let values = req.query;
    console.log(values);
    let lat=values.lat;
    let lng=values.lng;
    let buffer=values.buffer || 1;
    let limit=values.limit || 1;
    routing.closest(lat, lng, buffer, limit)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(reason => {
            res.status(500).json(reason);
        });
});

app.listen(exp_config.port, () => console.log(`app listening on port ${exp_config.port}!`));