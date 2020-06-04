var pkgInfo = require('./package.json');
var Service = require('webos-service');
var express = require('express');
var lunaAPI = require('./luna');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var router = require('./routes/main')(app);

var port = 5555;
var msg = "null";

var service = new Service(pkgInfo.name);
var keepAlive;
service.activityManager.create("keepAlive", function(activity){
  keepAlive = activity;
});

io.on('connection', (socket) => {
  socket.on('forward', (data) => {
    service.call("luna://com.webos.service.tts/speak", {"text":"전진", "language": "ko-KR", "clear":true}, function(){msg = "forward"});
    service.call("luna://com.app.rora.service.carcontrol/forward", {"speed":""}, function(m){
      msg = m.payload.returnValue;
    });
  });
  
  socket.on('backward', (data) => {
    service.call("luna://com.webos.service.tts/speak", {"text":"후진", "language": "ko-KR", "clear":true}, function(){msg = "backward"});
    service.call("luna://com.app.rora.service.carcontrol/backward", {"speed":""}, function(m){
      msg = m.payload.returnValue;
    });
  });

  socket.on('right', (data) => {
    service.call("luna://com.app.rora.service.carcontrol/right", {"speed":""}, function(m){
      msg = m.payload.returnValue;
    });
  });

  socket.on('left', (data) => {
    service.call("luna://com.app.rora.service.carcontrol/left", {"speed":""}, function(m){
      msg = m.payload.returnValue;
    });
  });

  socket.on('stop', (data) => {
    service.call("luna://com.webos.service.tts/speak", {"text":"정지", "language": "ko-KR", "clear":true}, function(){msg = "stop"});
    service.call("luna://com.app.rora.service.carcontrol/stop", {"speed":""}, function(m){
      msg = m.payload.returnValue;
    });
  });
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));

var server = http.listen(port, function(){
  service.call("luna://com.webos.service.tts/speak", {"text":"JAVIS 서비스가 시작되었습니다.", "language": "ko-KR", "clear":true}, function(){console.log("")});
  console.log("Express server has started on port " + port + "");
});