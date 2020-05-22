// helloclient.js
// Subscribe & cancel subscription to helloService's heartbeat method
var Service = require('webos-service');
var pmloglib = require('pmloglib'); // For use pmlog, pmlog is wirted /var/log/messages

var context = new pmloglib.Context("helloClient"); // Create context of pmlog
var service = new Service("com.example.helloclient"); // Register com.example.helloworld

console.log("simple call");
//Change @SERVICE-NAME@ to real service name
service.call("luna://@SERVICE-NAME@/hello", {}, function(message) {
    context.log(pmloglib.LOG_INFO, "SERVICE_CALL",{}, "call @SERVICE-NAME@/hello");
    console.log("message payload: " + JSON.stringify(message.payload));
    var sub = service.subscribe("luna://@SERVICE-NAME@/heartbeat", {subscribe: true});
    var count = 0;
    var max = 10;
    sub.addListener("response", function(msg) {
        console.log(JSON.stringify(msg.payload));
        if (++count >= max) {
            sub.cancel();
            setTimeout(function(){
                console.log(max+" responses received, exiting...");
                process.exit(0);
            }, 1000);
        }
    });
});
