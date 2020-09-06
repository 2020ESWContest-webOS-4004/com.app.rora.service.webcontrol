/**
 * service      :   com.app.rora.service.webcontrol
 * type         :   JSService
 * date         :   2020.09.02
 * author       :   소찬영(RORA PM)
 * description  :   공유 모빌리티 제어를 위한 사용자 웹컨트롤러 서비스
 */

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

// 사고 발생 시 구조요청 서비스
service.register("help_call", function(message){
  var type = message.payload.type;
  utils.help_request(type);

  message.respond({
    returnValue: true,
    helpType: type
  });
});

// 차량 인증 상태 확인하는 서비스
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

// 차량 인증이 성공할 경우 인증완료 처리하는 서비스
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