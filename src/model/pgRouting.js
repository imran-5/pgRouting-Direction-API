const {pool, query} = require('../config/database');
const {config_pg} = require('../config/config');

function distanceQuery(start, end) {
    const query = `SELECT * FROM pgr_dijkstra(
        'SELECT gid as id, source, target, cost_len as cost FROM ${config_pg.table}', 
        (SELECT id FROM ${config_pg.vertices_table} ORDER BY st_distance(the_geom, st_setsrid(st_makepoint(${start}), ${config_pg.input_srid})) LIMIT 1), 
        (SELECT id FROM ${config_pg.vertices_table} ORDER BY st_distance(the_geom, st_setsrid(st_makepoint(${end}), ${config_pg.input_srid})) LIMIT 1)
        , false)`;
    return query;
}

function routeQuery(start, end) {
    const query = `
    SELECT *, st_transform(geom, ${config_pg.output_srid}) as geom, st_asgeojson(st_transform(geom, ${config_pg.output_srid})) geojson, st_astext(st_transform(geom, ${config_pg.output_srid})) wkt FROM pgr_dijkstra(
        'SELECT gid as id, source, target, cost_len as cost, rcost_len as reverse_cost FROM ${config_pg.table}', 
        (SELECT id FROM ${config_pg.vertices_table} ORDER BY st_distance(the_geom, st_setsrid(st_makepoint(${start}), ${config_pg.input_srid})) LIMIT 1),
        (SELECT id FROM ${config_pg.vertices_table} ORDER BY st_distance(the_geom, st_setsrid(st_makepoint(${end}), ${config_pg.input_srid})) LIMIT 1),
        false) as dj, ${config_pg.table} as ln where dj.edge=ln."gid";`;
    return query;
}

function nearbyQuery(lat, lng, buffer, limit) {
    const point = `ST_SetSRID(ST_MakePoint(${lat}, ${lng}), ${config_pg.input_srid})`;
    const query = `
    SELECT *, st_transform(geom, ${config_pg.output_srid}) as geom, st_asgeojson(st_transform(geom, ${config_pg.output_srid})) geojson, st_astext(st_transform(geom, ${config_pg.output_srid})) wkt, ST_Distance(geom, ${point}) distance
    FROM ${config_pg.table}
    WHERE ST_DWithin(geom, ${point}, ${buffer})
    ORDER BY ST_Distance(geom, ${point}) asc
    LIMIT ${limit}`;
    return query;
}

function route(start, end) {
    return new Promise((resolve, reject) => {
        query(routeQuery(start, end), (err, res) => {
            if (err) {
                reject('query error', err);
                return;
            }
            resolve({
                route: res.rows,
                // route: res.rows.map(r => ({
                // geom: r.geom,
                // cost: r.cost
                // }))
            });
        });
    });
}

function distance(start, end) {
    return new Promise((resolve, reject) => {
        query(distanceQuery(start, end), (err, res) => {
            if (err) {
                reject('query error', err);
                return;
            }
            // let cost = res.rows.map(r => r.cost).reduce((a, b) => a + b);
            resolve({
                // distance: cost
                distance_meters: res.rows[res.rows.length - 1].agg_cost,
            });
        });
    });
}

function closest(lat, lng, buffer, limit) {
    return new Promise((resolve, reject) => {
        query(nearbyQuery(lat, lng, buffer, limit), (err, res) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(res.rows);
        });
    });
}

module.exports = {
    route,
    distance,
    closest,
};
