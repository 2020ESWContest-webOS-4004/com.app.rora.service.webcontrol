var express = require('express');
var auth_lib = require('../auth');
var router = express.Router();

var jarvis_session = auth_lib.auth_session;

// 스마트 홈 접속
router.get('/smarthome', function(req, res){
    if(jarvis_session.userid){
        res.render('smarthome', {session: jarvis_session});
    } else {
        res.redirect('/window');
    }
});

module.exports = router;