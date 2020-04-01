var mysql = require("mysql");

var connection;


if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        socketPath : '/tmp/mysqld.sock',
        port: 3306,
        user: "root",
        password: "password",
        database: "waitlist_db"
        });
}

connection.connect(function(err) {
    if (err) {
        console.error("error connecting to: " + err.stack);
        return;
    } 
    console.log("connected as id: " + connection.threadId);
});

// var del = connection._protocol._delegateError;

// connection._protocol._delegateError = function(err, sequence){
//   if (err.fatal) {
//     console.trace('fatal error: ' + err.message);
//   }
//   return del.call(this, err, sequence);
// };
module.exports = connection;