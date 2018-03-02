var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webshop'
})

connection.connect()

module.exports = connection;


//use enviroment files when developing for real