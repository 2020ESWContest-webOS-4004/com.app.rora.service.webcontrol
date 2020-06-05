var pkgInfo = require('./package.json');
var Service = require('webos-service');
var express = require('express');
var luna = require('./luna');
var app = express();
var utils = require('./utils');
var http = require('http').createServer(app);
var router = require('./routes/main')(app);
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

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));

var server = http.listen(env.port, function(){
  console.log("Express server has started on port [" + env.port + " ]");
  utils.init(service, http);
});