var dbconfig = require('./env/dbConfig');
var querystring = require('querystring');
var mysql = require('mysql');
var conn;

function sessionPrint() {
    console.log(session);
}