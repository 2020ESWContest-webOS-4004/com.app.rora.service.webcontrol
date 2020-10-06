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

router.get('/signage', function(req, res) {
    res.render('signage', { session: jarvis_session });
 })

 router.post('/signage/call', function(req, res) {
    if(req.body) {
       res.render('signagecall', { session: jarvis_session, data:req.body });
    } else {
       res.redirect('/iot/signage');
    }
 })

module.exports = router;