var luna = require('./luna');

var io;
var ls2;
var server;
var callList = {};

function callListinit(){
    callList['forward'] = forward;
    callList['backward'] = backward;
    callList['right'] = right;
    callList['left'] = left;
    callList['stop'] = stop;
}

function tts(ment){
    luna.tts(ment, function(){
        console.log("a");
    });
}

function forward(){
    var status = "";
    luna.get_infrared_value({}, function(m){
        status = m.payload.status;
        if(status == "detected"){
            tts("전방에 장애물");
            stop();
        }
        if(status == "Non"){
            tts("전진");
            luna.rc_forward({"speed":""}, function(m){
                msg = m.payload.returnValue;
            });
        }
    });
}

function backward(){
    luna.rc_backward({"speed":""}, function(m){
        msg = m.payload.returnValue;
    });
}

function right(){
    luna.rc_right({"speed":""}, function(m){
        msg = m.payload.returnValue;
    });
}

function left(){
    luna.rc_left({"speed":""}, function(m){
        msg = m.payload.returnValue;
    });
}

function stop(){
    luna.rc_stop({"speed":""}, function(m){
        msg = m.payload.returnValue;
    });
}

function init(service, http){
    ls2 = service;
    server = http;
    io = require('socket.io')(server);
    luna.init(service);
    callListinit();

    io.on('connection', (socket) => {
        socket.on('ls-call', (data) => {
            var func = callList[data.name];
            func();
        });
    });

    exports.io = io;
}

exports.init = init;