var express = require('express');
var auth_lib = require('../auth');
var router = express.Router();
var jarvisModel = require('../models/jarvisModel');
var jarvisController = require('../controller/jarvisController');

var jarvis_session = auth_lib.auth_session;

router.get('/', function (req, res) {
    if (jarvis_session.userid) {
        let userid = jarvis_session.userid;
        jarvisModel.getJarvisMember(userid, (result) => {
            let shareChecked = {
                card_registered: result[0].card_registered,
                license_registered: result[0].license_registered
            }
            res.render('carshare', { session: jarvis_session, shareChecked: shareChecked});
        });
    }
    else {
        res.redirect('/window');
    }
});
router.get('/license', function (req, res) {
    if (jarvis_session.userid) {
        res.render('drivinglicense', {session: jarvis_session});
    } else {
        res.redirect('/window');
    }
    
});
router.post('/license', function (req, res) {
    if(jarvis_session.userid) {
        let userid = jarvis_session.userid;
        let data = {
            license_number: jarvisController.concatLicenseNumber(req.body),
            license_class: req.body.license_class
        };
        jarvisModel.insertDrivingLicenseInfo(userid, data, result => {
            if(!result[0].msg) {
                res.redirect('/share');
            } else {
                res.send(result.msg);
            }
        });
        
        
    } else {
        res.redirect('/window');
    }
});

router.get('/card', function (req, res) {
    if (jarvis_session.userid) {
        res.render('cardregistration', { session: jarvis_session });
    } else {
        res.redirect('/window');
    }
});
router.post('/card', function (req, res) {
    if(jarvis_session.userid) {
        let userid = jarvis_session.userid;
        let data = {
            card_num: jarvisController.concatCardNumber(req.body),
            expiration_date: jarvisController.concatExpirationDate(req.body),
            CVC: req.body.CVC,
            card_password: req.body.card_password
        }
        jarvisModel.insertCreditCardInfo(userid, data, result => {
            if(!result[0].msg) {
                res.redirect('/share');
            } else {
                res.send(result.msg);
            }
        });
    } else {
        res.redirect('/window');
    }
});

router.get('/end', function(req, res) {
    res.render('sharepayment', {session: jarvis_session});
});

module.exports = router;
