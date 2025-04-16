const mysql = require('mysql2/promise');
const db = require('./config').db;

const pool = mysql.createPool({
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.password,
    database: db.database,
    waitForConnections: true,
    connectionLimit: 15,
});

module.exports = pool;