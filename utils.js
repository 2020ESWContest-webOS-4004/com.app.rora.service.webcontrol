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

function forward(socket){
    var status = "";
    luna.get_infrared_value({}, function(m){
        status = m.payload.status;
        if(status == "detected"){
            tts("전방에 장애물");
            stop();
            socket.broadcast.emit("status", {"text": "정지", "word": "P", "speed": "0"});
        }
        if(status == "Non"){
            luna.rc_forward({"speed":""}, function(m){
                msg = m.payload.returnValue;
                socket.broadcast.emit("status", {"text": "전진", "word": "D", "speed": "25"});
            });
        }
    });
}

function backward(socket){
    luna.rc_backward({"speed":""}, function(m){
        msg = m.payload.returnValue;
        socket.broadcast.emit("status", {"text": "후진", "word": "R", "speed": "25"});
    });
}

function right(socket){
    luna.rc_right({"speed":""}, function(m){
        msg = m.payload.returnValue;
        socket.broadcast.emit("status", {"text": "우회전", "word": "D", "speed": "25"});
    });
}

function left(socket){
    luna.rc_left({"speed":""}, function(m){
        msg = m.payload.returnValue;
        socket.broadcast.emit("status", {"text": "좌회전", "word": "D", "speed": "25"});
    });
}

function stop(socket){
    luna.rc_stop({"speed":""}, function(m){
        msg = m.payload.returnValue;
        socket.broadcast.emit("status", {"text": "정지", "word": "P", "speed": "0"});
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
            func(socket);
        });
    });

    exports.io = io;
}

exports.init = init;