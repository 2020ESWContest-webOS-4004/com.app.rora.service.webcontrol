var luna = require('./luna');
var fs = require('fs');
var env = require('./env/env.json');

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
    callList['start_engine'] = start_engine;
    callList['stop_engine'] = stop_engine;
    callList['welcome_voice'] = welcome_voice;
}

function tts(ment){
    luna.tts(ment, function(){
        console.log("a");
    });
}

function forward(socket){
    var status = "";
    var power = get_engine();
    var auth = get_auth();

    if(!auth){
        tts("사용자 인증이 필요합니다");
        socket.broadcast.emit("user-auth", {"status":"no auth"});
        return 0;
    }
    else if(power == "0"){
        tts("시동 버튼을 눌러주세요");
        socket.broadcast.emit("user-auth", {"status":"no power"});
        return 0;
    }
    luna.get_infrared_value({}, function(m){
        status = m.payload.status;
        if(status == "detected"){
            tts("전방에 장애물");
            stop(socket);
            socket.broadcast.emit("status", {"text": "정지", "word": "N", "speed": "0"});
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
    var power = get_engine();
    var auth = get_auth();

    if(!auth){
        tts("사용자 인증이 필요합니다");
        socket.broadcast.emit("user-auth", {"status":"no auth"});
        return 0;
    }
    else if(power == "0"){
        tts("시동 버튼을 눌러주세요");
        socket.broadcast.emit("user-auth", {"status":"no power"});
        return 0;
    }
    luna.rc_backward({"speed":""}, function(m){
        msg = m.payload.returnValue;
        socket.broadcast.emit("status", {"text": "후진", "word": "R", "speed": "25"});
    });
}

function right(socket){
    var power = get_engine();
    var auth = get_auth();

    if(!auth){
        tts("사용자 인증이 필요합니다");
        socket.broadcast.emit("user-auth", {"status":"no auth"});
        return 0;
    }
    else if(power == "0"){
        tts("시동 버튼을 눌러주세요");
        socket.broadcast.emit("user-auth", {"status":"no power"});
        return 0;
    }
    luna.rc_right({"speed":""}, function(m){
        msg = m.payload.returnValue;
        socket.broadcast.emit("status", {"text": "우회전", "word": "D", "speed": "25"});
    });
}

function left(socket){
    var power = get_engine();
    var auth = get_auth();

    if(!auth){
        tts("사용자 인증이 필요합니다");
        socket.broadcast.emit("user-auth", {"status":"no auth"});
        return 0;
    }
    else if(power == "0"){
        tts("시동 버튼을 눌러주세요");
        socket.broadcast.emit("user-auth", {"status":"no power"});
        return 0;
    }
    luna.rc_left({"speed":""}, function(m){
        msg = m.payload.returnValue;
        socket.broadcast.emit("status", {"text": "좌회전", "word": "D", "speed": "25"});
    });
}

function stop(socket){
    var power = get_engine();
    var auth = get_auth();

    if(!auth){
        tts("사용자 인증이 필요합니다");
        socket.broadcast.emit("user-auth", {"status":"no auth"});
        return 0;
    }
    else if(power == "0"){
        tts("시동 버튼을 눌러주세요");
        socket.broadcast.emit("user-auth", {"status":"no power"});
        return 0;
    }

    luna.rc_stop({"speed":""}, function(m){
        msg = m.payload.returnValue;
        socket.broadcast.emit("status", {"text": "정지", "word": "P", "speed": "0"});
    });
}

// do not work.. :(
function start_engine(socket){
    set_engine("1"); //work..
    socket.broadcast.emit("car_engine", {"status": "start"}); //not work..
}

// do not work.. :(
function stop_engine(socket){
    set_engine("0"); //work..
    socket.broadcast.emit("car_engine", {"status": "stop"}); //not work..
}

function get_engine(){
    var engine_flag = fs.readFileSync(env.home_directory + "/engine_status", 'utf8');
    return engine_flag;
}

function set_engine(value){
    fs.writeFileSync(env.home_directory + "/engine_status", value, 'utf8');
}

function get_auth(){
    var auth = fs.readFileSync(env.home_directory + "/user_auth", 'utf8');
    return auth;
}

function set_auth(value){
    fs.writeFileSync(env.home_directory + "/user_auth", value, 'utf8');
    return true;
}

function welcome_voice(socket){
    var name = get_auth();
    if(name)
        tts(name + "님 안녕하세요");
}

function init(service, http){
    ls2 = service;
    server = http;
    io = require('socket.io')(server);
    luna.init(service);
    callListinit();

    set_auth("");
    set_engine("0");    // if parameter is 0, engine status :off

    io.on('connection', (socket) => {
        socket.on('ls-call', (data) => {
            var func = callList[data.name];
            func(socket);
        });
    });

    exports.io = io;
}

exports.init = init;
exports.set_auth = set_auth;
exports.get_auth = get_auth;
exports.welcome_voice = welcome_voice;