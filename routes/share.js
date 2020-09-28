var express = require('express');
var auth_lib = require('../auth');
var router = express.Router();
var jarvisModel = require('../models/jarvisModel');
var jarvisController = require('../controller/jarvisController');

var jarvis_session = auth_lib.auth_session;

router.get('/', function (req, res) {
    console.log('--share 페이지 접속--');

    if (jarvis_session.userid) {
        console.log('로그인 확인되었습니다.');
        res.render('carshare', { session: jarvis_session });
    }
    else {
        console.log('로그인이 되지않았습니다.');
        res.redirect('/window');
    }
});
router.get('/license', function (req, res) {
    res.render('drivinglicense', {session: jarvis_session});
});
router.post('/license', function (req, res) {
    let userid = jarvis_session.userid;
    let data = {
        license_num: jarvisController.concatLicenseNumber(req.body),
        license_class: req.body.license_class
    }
    jarvisModel.insertDrivingLicenseInfo(userid, data, (result) => {
        if (result) {
            jarvisModel.updateJarvisMember(userid, 'license_registered', 1, (result) => {
                if(result) {
                    res.redirect('/share');
                }
            });
        }
        else {
            res.send('error');
        }
    });

});

router.get('/card', function (req, res) {
    res.render('cardregistration', {session: jarvis_session});
});
router.post('/card', function (req, res) {
    let userid = jarvis_session.userid;
    let data = {
        card_num: jarvisController.concatCardNumber(req.body),
        expiration_date: jarvisController.concatExpirationDate(req.body),
        CVC: req.body.CVC,
        card_password: req.body.card_password
    }
    jarvisModel.insertCreditCardInfo(userid, data, (result) => {
        if (result) {
            jarvisModel.updateJarvisMember(userid, 'card_registered', 1, (result) => {
                if(result) {
                    res.redirect('/share');
                }
            });
        }
        else {
            res.send('error');
        }
    });

});

router.get('/end', function(req, res) {
    res.render('sharepayment', {session: jarvis_session});
})

module.exports = router;
