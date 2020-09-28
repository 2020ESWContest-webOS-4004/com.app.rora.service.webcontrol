var mysql = require("mysql");
var dbconfig = require("../env/dbConfig.json")

var dbOptions = {
    host: dbconfig.host,
    port: dbconfig.port,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database
};
// mysql 연결
const mysqlConnection = {
    init: function () {
        return mysql.createConnection(dbOptions);
    }, 
    open: function (conn) {
        conn.connect(function (err) {
            if (err) { 
                console.error('MySQL connection failed.');
                console.error('Error Code : ' + err.code); 
                console.error('Error Message : ' + err.message); 
            } else { 
                console.log('MySQL connection successful.'); 
            }
        });
    }, 
    close: function (conn) { 
        conn.end(function (err) { 
            if (err) { 
                console.error('MySQL Terminate failed.'); 
                console.error('Error Code : ' + err.code); 
                console.error('Error Message : ' + err.message); 
            } else { 
                console.log("MySQL Terminate connection."); 
            } 
        }); 
    }
}; 
module.exports = mysqlConnection;
