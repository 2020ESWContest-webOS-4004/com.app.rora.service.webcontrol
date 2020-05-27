var pkgInfo = require('./package.json');
var Service = require('webos-service');
var express = require('express');
var app = express();
var path = require('path');
var router = require('./routes/main')(app);

var port = 5555;

var service = new Service(pkgInfo.name); // Create service by service name on package.json
var keepAlive;
service.activityManager.create("keepAlive", function(activity){
  keepAlive = activity;
});

service.register("hello", function(message) {
  var name = message.payload.name ? message.payload.name : "World";

    message.respond({
        returnValue: true,
        Response: "Hello, " + name + "!"
    });
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('./js'));

var server = app.listen(port, function(){
  console.log("Express server has started on port " + port + "");
});