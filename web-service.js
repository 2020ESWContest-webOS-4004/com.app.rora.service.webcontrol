var pkgInfo = require('./package.json');
var Service = require('webos-service');
var pmloglib = require('pmloglib'); // For use pmlog, pmlog is wirted /var/log/messages

var service = new Service(pkgInfo.name); // Create service by service name on package.json
var context = new pmloglib.Context("helloService"); // Create context of pmlog
var greeting = "Hello, World!";

function text(){
    var str = " +-+-+-+-+- ";
    return str;
}

// a method that always returns the same value
service.register("hello", function(message) {
    context.log(pmloglib.LOG_INFO, "SERVICE_METHOD_CALLED",{}, "" + pkgInfo.name + "/hello");
    console.log("In hello callback");
    var str = text();
    message.respond({
        returnValue: true,
        Response: "Hello, " + message.payload.name + str + "!"
    });
});