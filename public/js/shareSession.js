/*var dbconfig = require('/env/dbConfig');
var querystring = require('querystring');
var mysql = require('mysql');
var conn;

var dbOptions = {
    host: dbconfig.host,
    port: dbconfig.port,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database
};
*/


function sessionPrint() {
    
}

function getMemberData(userid) {
    /*
    conn = mysql.createConnection(dbOptions);

    conn.connect();

    var login_sql = 'SELECT * FROM jarvis_member where jarvis_id=?';

    conn.query(login_sql, [userid], function(error, result_row) {
        if(error) console.error(error);

        else{
            session.shareChecked = {
                phone_num           : result_row[0].phone_num,
                car_owned           : result_row[0].car_owned,
                card_registered     : result_row[0].card_registered,
                license_registered  : result_row[0].license_registered          
            }
            console.log(session)
        }
    });
    conn.end();
    */
    console.log();
    
}