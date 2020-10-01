var mysql = require('mysql');
var auth_lib = require('../auth');
var express_session = require('express-session');

module.exports = function (app, utils) {
   var jarvis_session = auth_lib.auth_session;

   app.use(express_session({
      secret:'skhu-rora',
      resave: false,
      saveUninitialized: true,
      cookie: {
        time: 24000 * 60 * 60 // 쿠키 유효 시간24시간
      }
   }));
    

   app.get('/', function (req, res) {
      var name = req.query.name;
      var power = req.query.power;
      var auth_flag = false;

      var welcome_voice = utils.welcome_voice;

      if (name)
         var auth_flag = utils.set_auth(name);

      if (power == "1")
         utils.set_engine(power);

      if (auth_flag) {
         res.render('index', { auth: name, welcome_voice: welcome_voice });
      }
      else {
         utils.set_auth("");
         res.render('index', { auth: "" });
      }
   });
   app.get('/dashboard', function (req, res) {
      res.render('dashboard', {session: jarvis_session});
   });
   app.get('/window', function (req, res) {
      res.render('window', {session: jarvis_session});
   });

   app.get('/logout', function(req, res) {
      auth_lib.jarvis_logout();
      res.redirect('dashboard');
   });
}