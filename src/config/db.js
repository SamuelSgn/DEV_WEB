const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'Marvin2027&',
    database: 'epytodo'
});

connection.connect(function(err) {
    if(err){
        console.error('Cannot be connected' + err.message);
        return;
    }
    console.log('Successfully connected as id ' + connection.threadId);
});

module.exports = connection;