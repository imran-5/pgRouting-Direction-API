const { query } = require('./database');
const { config_pg } = require('./config');

function route(start, end) {
    const query = `SELECT *, st_transform(geom, ${config_pg.output_srid}) as geom, st_asgeojson(st_transform(geom, ${config_pg.output_srid})) geojson, st_astext(st_transform(geom, ${config_pg.output_srid})) wkt FROM pgr_dijkstra(
        'SELECT id, source, target, cost_len as cost, rcost_len as reverse_cost FROM ${config_pg.table}', 
        (SELECT id FROM ${config_pg.vertices_table} ORDER BY st_distance(the_geom, st_setsrid(st_makepoint(${start}), ${config_pg.input_srid})) LIMIT 1),
        (SELECT id FROM ${config_pg.vertices_table} ORDER BY st_distance(the_geom, st_setsrid(st_makepoint(${end}), ${config_pg.input_srid})) LIMIT 1),
        false) as dj, ${config_pg.table} as ln where dj.edge=ln."id";`;
    return query(query);
}

function distance(start, end) {
    const query = `SELECT * FROM pgr_dijkstra(
        'SELECT id, source, target, cost_len as cost FROM ${config_pg.table}', 
        (SELECT id FROM ${config_pg.vertices_table} ORDER BY st_distance(the_geom, st_setsrid(st_makepoint(${start}), ${config_pg.input_srid})) LIMIT 1), 
        (SELECT id FROM ${config_pg.vertices_table} ORDER BY st_distance(the_geom, st_setsrid(st_makepoint(${end}), ${config_pg.input_srid})) LIMIT 1)
        , false)`;
    return query(query);
}

function closest(lat, lng, buffer, limit) {
    const point = `ST_SetSRID(ST_MakePoint(${lat}, ${lng}), ${config_pg.input_srid})`;
    const query = `SELECT *, st_asgeojson(st_transform(geom, ${config_pg.output_srid})) geojson, st_astext(st_transform(geom, ${config_pg.output_srid})) wkt, ST_Distance(geom, ${point}) distance
    FROM ${config_pg.table}
    WHERE ST_DWithin(geom, ${point}, ${buffer})
    ORDER BY ST_Distance(geom, ${point}) asc
    LIMIT ${limit}`;
    return query(query);
}

const topology = async () => {
    // https://docs.pgrouting.org/latest/en/topology-functions.html
    await query(`SELECT pgr_createTopology('${config_pg.table}', 0.0001, 'geom', 'id')`, () => {
        console.log("Topology created");
    });

    await query(`SELECT pgr_createVerticesTable('${config_pg.vertices_table}', 'geom', 'source', 'target')`, () => {
        console.log("Vertices Table created");
    });

    await query(`SELECT  pgr_analyzeGraph('${config_pg.table}', 0.0001, 'geom','id', 'source', 'target')`, () => {
        console.log("Graph Anaysis");
    });

    await query(`UPDATE ${config_pg.table} SET cost_len = ST_Length(st_transform(geom, 3857))`, () => {
        console.log("Cost length");
    });

    await query(`UPDATE ${config_pg.table} SET rcost_len = cost_len)`, () => {
        console.log("Reverse cost length");
    });
}
module.exports = {
    route,
    distance,
    closest,
    topology
};
