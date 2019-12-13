var mysql = require('mysql');
var dbconfig = require('./dbconfig');

var connection = mysql.createConnection({
    host: dbconfig.dbhost,
    port: dbconfig.dbport,
    user: dbconfig.dbuser,
    password: dbconfig.dbpassword,
    database: dbconfig.databasename
});

console.log('connecton' + connection);

connection.connect(function(err){
    if(err) throw err;
});

module.exports = connection;