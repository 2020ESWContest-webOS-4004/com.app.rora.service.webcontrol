var pkgInfo = require('./package.json');
var Service = require('webos-service');
var express = require('express');
var lunaAPI = require('./luna');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var router = require('./routes/main')(app);

var port = 5555;
var num = "0";

var service = new Service(pkgInfo.name); // Create service by service name on package.json
var keepAlive;
service.activityManager.create("keepAlive", function(activity){
  keepAlive = activity;
});

//var bridge = new WebOSServiceBridge();
//bridge.call("luna://com.app.rora.carcontrol.service/forward", '{"speed":""}');
//lunaAPI.init(service);

service.register("hello", function(message) {
  var name = message.payload.name ? message.payload.name : "World";

    message.respond({
        returnValue: true,
        Response: "num : " + num + " !"
    });
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));

io.on('connection', (socket) => {
  console.log('connected!!!');
  socket.on('forward', (msg) => {
    num = "5555";
    service.call("luna://com.app.rora.carcontrol.service/forward", {"speed":""}, function(){
      num = "99999!";
    });
  });
});

var server = http.listen(port, function(){
  console.log("Express server has started on port " + port + "");
});