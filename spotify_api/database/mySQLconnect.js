var mysql = require('mysql');

var connection = mysql.createConnection({
        debug: true,
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'spotify_api'
});

module.exports = connection;
