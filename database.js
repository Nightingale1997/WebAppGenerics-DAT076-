var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'hajo',
    password: 'hajo',
    database: 'webshop'
});

connection.connect();

module.exports = connection;


//use environment files when developing for real