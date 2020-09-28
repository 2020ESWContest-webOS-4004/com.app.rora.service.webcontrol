/**
 * service      :   com.app.rora.service.webcontrol
 * type         :   JSService
 * date         :   2020.09.29
 * author       :   배상준(RORA)
 * description  :   카드, 면허 정보 DB Model
**/

const mysqlConnObj = require('../config/mysql');
const conn = mysqlConnObj.init();

exports.getJarvisMemberList = (callback) => {
    mysqlConnObj.open(conn);
    let sql = 'SELECT * FROM jarvis_member';
    conn.query(sql, function(error, results, fields) {
        if(error) throw error;

        else{
            callback(JSON.parse(JSON.stringify(results)));
        }
    });
    conn.end();
};

exports.getJarvisMember = (userid, callback) => {
    mysqlConnObj.open(conn);
    let sql = `select * from jarvis_member where jarvis_id = ?`;
    conn.query(sql, [userid], (error, results, fields) => {
        if(error) throw error;

        else{
            callback(JSON.parse(JSON.stringify(results)));
        }
    });
    conn.end();
}

exports.updateJarvisMember = (userid, column, data, callback) => {
    mysqlConnObj.open(conn);
    let sql = `update jarvis_member set ? = ? where jarvis_member_id = ?`;
    let bindParam = [
        column,
        data,
        userid
    ];
    conn.query(sql, bindParam, (error, results, fields) => {
        if(error) throw error;
        else { 
            callback(JSON.parse(JSON.stringify(results)));
        }
    });

};

exports.insertCreditCardInfo = (userid, data, callback) => {
    mysqlConnObj.open(conn);
    let sql = `insert into credit_card_info values(?, ?, ?, ?, ?)`;
    let bindParam = [
        userid, 
        data.card_num, 
        data.expiration_date,
        data.CVC,
        data.card_password
    ];
    conn.query(sql, bindParam, (error, results, fields) => {
        if(error) throw error;

        else{
            callback(JSON.parse(JSON.stringify(results)));
        }
    });
    conn.end();
}

exports.insertDrivingLicenseInfo = (userid, data, callback) => {
    mysqlConnObj.open(conn);
    let sql = `insert into driving_license_info values(?, ?, ?)`;
    let bindParam = [
        userid, 
        data.license_num, 
        data.license_class
    ];
    conn.query(sql, bindParam, (error, results, fields) => {
        if(error) throw error;

        else{
            callback(JSON.parse(JSON.stringify(results)));
        }
    });
    conn.end();
}