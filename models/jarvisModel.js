/**
 * service      :   com.app.rora.service.webcontrol
 * type         :   JSService
 * date         :   2020.09.20
 * author       :   소찬영(RORA PM)
 * description  :   생체인증 정보를 통해 웹에서 로그인 처리를 하는 라이브러리 정의
**/
const mysql = require('mysql');
const mysqlConnObj = require('../config/mysql');
const conn = mysqlConnObj.init();
mysqlConnObj.open(conn);


/*---------jarvis_member---------*/
exports.getJarvisMemberList = (callback) => {
    let sql = 'SELECT * FROM jarvis_member';
    conn.query(sql, function(error, result, fields) {
        if(!error) {
            callback(JSON.parse(JSON.stringify(result)));
        } else{
            callback(error);
        }
    });
};


exports.getJarvisMember = (userid, callback) => {
    let sql = `select * from jarvis_member where jarvis_id = ?`;
    conn.query(sql, [userid], (error, result, fields) => {
        if(!error) {
            callback(JSON.parse(JSON.stringify(result)));
        } else{
            callback(error);  
        }
    });
}

exports.updateJarvisMemberPoint = (userid, value, callback) => {
    let sql = `update jarvis_member set member_point = member_point + ? where jarvis_id = ?`;
    conn.query(sql, [value, userid], (error, result, fields) => {
        if (!error) {
            if(result.affectedRows > 0) {
                callback(JSON.parse(JSON.stringify(result)));
            }
            else {
                callback({msg:'포인트 수정이 실패했습니다.'});
            }
        } else {
            callback(error);
        }
    });
};

/*---------credit_card_info---------*/
exports.getCreditCardInfo = (userid, callback) => {
    let sql = `select * from credit_card_info where jarvis_member_id = ?`;
    conn.query(sql, [userid], (error, result, fields) => {
        if(!error) {
            if(result[0]!=undefined) {
                callback(JSON.parse(JSON.stringify(result)));
            }
            else {
                callback([{msg:'조회가 실패하였습니다'}]);
            }
        } else{
            callback(error);
        }
    });
};

exports.insertCreditCardInfo = (userid, data, callback) => {
    let sql1 = `insert into credit_card_info values(?, ?, ?, ?, ?);`;
    let bindParam1 = [
        userid, 
        data.card_num, 
        data.expiration_date,
        data.CVC,
        data.card_password
    ];
    let sql1s = mysql.format(sql1, bindParam1);

    let sql2 = `update jarvis_member set card_registered = 1 where jarvis_id = ?`;
    let sql2s = mysql.format(sql2, userid);

    conn.query(sql1s + sql2s, (error, result) => {
        if (!error) {
            if(result[0].affectedRows > 0 && result[1].affectedRows) {
                callback(JSON.parse(JSON.stringify(result)));
            }
            else {
                callback([{msg:'카드 정보 입력이 실패했습니다.'}]);
            }
        } else {
            callback(error);
        }
    });
};
/*---------driving_license_info---------*/
exports.getDrivingLicenseInfo = (userid, callback) => {
    let sql = `select * from driving_license_info where jarvis_member_id = ?`;
    conn.query(sql, [userid], (error, result, fields) => {
        if(!error) {
            if(result[0]!=undefined) {
                callback(JSON.parse(JSON.stringify(result)));
            }
            else {
                callback({msg:'조회가 실패하였습니다'});
            }
        } else{
            callback(error);
        }
    });
};


exports.insertDrivingLicenseInfo = (userid, data, callback) => {
    let sql1 = `insert into driving_license_info values(?, ?, ?);`;
    let bindParam1 = [
        userid, 
        data.license_number, 
        data.license_class
    ];
    let sql1s = mysql.format(sql1, bindParam1);

    let sql2 = `update jarvis_member set license_registered = 1 where jarvis_id = ?`;
    let sql2s = mysql.format(sql2, userid);

    conn.query(sql1s + sql2s, (error, result) => {
        if (!error) {
            if(result[0].affectedRows > 0 && result[1].affectedRows) {
                callback(JSON.parse(JSON.stringify(result)));
            }
            else {
                callback([{msg:'면허 정보 입력이 실패했습니다.'}]);
            }
        } else {
            callback(error);
        }
    });
};
