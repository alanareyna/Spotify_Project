// var mysql = require('mysql');

// var connection = mysql.createConnection({
//         debug: false,
//         host: '127.0.0.1',
//         port: 3306,
//         user: 'areyna_cs355fa22',
//         password: 're5790400',
//         database: 'areyna_cs355fa22'
// });

// module.exports = connection;
var mysql = require('mysql');

var connection = mysql.createConnection({
        debug: true,
        host: 'localhost',
        port: 3306,
        user: 'areyna',
        password: 'alanareyna',
        database: 'spotify_api'
});

module.exports = connection;