var pkgInfo = require('./package.json');
var Service = require('webos-service');
var express = require('express');
var luna = require('./luna');
var app = express();
var utils = require('./utils');
var http = require('http').createServer(app);
var router = require('./routes/main')(app, utils);
var env = require('./env/env.json');

var msg = "null";

var service = new Service(pkgInfo.name);
var keepAlive;
service.activityManager.create("keepAlive", function(activity){
  keepAlive = activity;
});

service.register("hello", function(message) {
  var name = message.payload.name ? message.payload.name : "World";

  message.respond({
      returnValue: true,
      Response: "port :  " + env.port + "!"
  });
});

service.register("help_call", function(message){
  var type = message.payload.type;
  utils.help_request(type);

  message.respond({
    returnValue: true,
    helpType: type
  });
});

service.register("get_auth", function(message){
  var auth = utils.get_auth();

  if(!auth)
    auth = false;
  message.respond({
    returnValue: true,
    auth: auth
  });
});

// 카메라 서버에 얼굴인식을 요청
service.register("request_camera", function(message){
  var io_client = utils.io_client;
  utils.request_camera(io_client);

  message.respond({
    returnValue: true
  });
});

service.register("set_auth", function(message){
  var value = message.payload.value;
  utils.set_auth(value);

  message.respond({
    returnValue: true,
  });
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));

var server = http.listen(env.port, function(){
  console.log("Express server has started on port [" + env.port + " ]");
  utils.init(service, http);
});