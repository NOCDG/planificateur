const { Pool } = require('pg');

const pool = new Pool({
    user: 'planificateur',
    host: 'localhost',
    database: 'planificateur',
    password: 'A7*IM2yS&!PYwxpT5zrp',
    port: 5432,
});

module.exports = pool;