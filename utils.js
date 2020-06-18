var luna = require('./luna');
var fs = require('fs');
var env = require('./env/env.json');
var http = require('http');
var querystring = require('querystring');

var io;
var ls2;
var server;
var callList = {};
var auth_count = 0;

function callListinit(){
    callList['forward'] = forward;
    callList['backward'] = backward;
    callList['right'] = right;
    callList['left'] = left;
    callList['stop'] = stop;
    callList['start_engine'] = start_engine;
    callList['stop_engine'] = stop_engine;
    callList['welcome_voice'] = welcome_voice;
    callList['start_assistant'] = start_assistant;
    callList['stop_assistant'] = stop_assistant;
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
        if(auth_count < 3){
            auth_count += 1;
            tts("사용자 인증이 필요합니다");
            socket.broadcast.emit("user-auth", {"status":"no auth"});
            return 0;
        }
        if(auth_count >= 3){
            tts("차량도난 시도가 감지되어 사용자에게 알립니다");
            var type = "theft";
            help_request(type);
            socket.broadcast.emit("user-auth", {"status":"no auth"});
            return 0;
        }
    }
    
    else if(power == "0"){
        auth_count = 0;
        tts("시동 버튼을 눌러주세요");
        socket.broadcast.emit("user-auth", {"status":"no power"});
        return 0;
    }
    auth_count = 0;
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
        if(auth_count < 3){
            auth_count += 1;
            tts("사용자 인증이 필요합니다");
            socket.broadcast.emit("user-auth", {"status":"no auth"});
            return 0;
        }
        if(auth_count >= 3){
            tts("차량도난 시도가 감지되어 사용자에게 알립니다");
            var type = "theft";
            help_request(type);
            socket.broadcast.emit("user-auth", {"status":"no auth"});
            return 0;
        }
    }
    else if(power == "0"){
        auth_count = 0;
        tts("시동 버튼을 눌러주세요");
        socket.broadcast.emit("user-auth", {"status":"no power"});
        return 0;
    }
    auth_count = 0;
    luna.rc_backward({"speed":""}, function(m){
        msg = m.payload.returnValue;
        socket.broadcast.emit("status", {"text": "후진", "word": "R", "speed": "25"});
    });
}

function right(socket){
    var power = get_engine();
    var auth = get_auth();

    if(!auth){
        if(auth_count < 3){
            auth_count += 1;
            tts("사용자 인증이 필요합니다");
            socket.broadcast.emit("user-auth", {"status":"no auth"});
            return 0;
        }
        if(auth_count >= 3){
            tts("차량도난 시도가 감지되어 사용자에게 알립니다");
            var type = "theft";
            help_request(type);
            socket.broadcast.emit("user-auth", {"status":"no auth"});
            return 0;
        }
    }
    else if(power == "0"){
        auth_count = 0;
        tts("시동 버튼을 눌러주세요");
        socket.broadcast.emit("user-auth", {"status":"no power"});
        return 0;
    }
    auth_count = 0;
    luna.rc_right({"speed":""}, function(m){
        msg = m.payload.returnValue;
        socket.broadcast.emit("status", {"text": "우회전", "word": "D", "speed": "25"});
    });
}

function left(socket){
    var power = get_engine();
    var auth = get_auth();

    if(!auth){
        if(auth_count < 3){
            auth_count += 1;
            tts("사용자 인증이 필요합니다");
            socket.broadcast.emit("user-auth", {"status":"no auth"});
            return 0;
        }
        if(auth_count >= 3){
            tts("차량도난 시도가 감지되어 사용자에게 알립니다");
            var type = "theft";
            help_request(type);
            socket.broadcast.emit("user-auth", {"status":"no auth"});
            return 0;
        }
    }
    else if(power == "0"){
        auth_count = 0;
        tts("시동 버튼을 눌러주세요");
        socket.broadcast.emit("user-auth", {"status":"no power"});
        return 0;
    }
    auth_count = 0;
    luna.rc_left({"speed":""}, function(m){
        msg = m.payload.returnValue;
        socket.broadcast.emit("status", {"text": "좌회전", "word": "D", "speed": "25"});
    });
}

function stop(socket){
    var power = get_engine();
    var auth = get_auth();

    if(!auth){
        if(auth_count < 3){
            auth_count += 1;
            tts("사용자 인증이 필요합니다");
            socket.broadcast.emit("user-auth", {"status":"no auth"});
            return 0;
        }
        if(auth_count >= 3){
            tts("차량도난 시도가 감지되어 사용자에게 알립니다");
            var type = "theft";
            help_request(type);
            socket.broadcast.emit("user-auth", {"status":"no auth"});
            return 0;
        }
    }
    else if(power == "0"){
        auth_count = 0;
        tts("시동 버튼을 눌러주세요");
        socket.broadcast.emit("user-auth", {"status":"no power"});
        return 0;
    }
    auth_count = 0;
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

function start_assistant(socket){
    tts("음성 비서를 시작합니다");
    luna.start_assistant();
    socket.broadcast.emit("assistant_status", {"status":"start"});
}
    
function stop_assistant(socket){
    tts("음성 비서를 종료 합니다");
    luna.stop_assistant();
    socket.broadcast.emit("assistant_status", {"status": "stop"});
}

function help_request(type){
    //dataType : DA(drive accident), TA(theft Accident)
    //conscious : conscious status -> 1, unconscious status -> 0
    var options;
    var userName = get_auth();
    var accidentTime = Date.now();
    var req;

    var options = { 
        host: env.help_server_address,
        path: env.help_server_path,
        port: env.help_server_port,
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        method: 'POST'
    };

    function readJSONResponse(response) {
        var responseData = ''; 
        response.on('data', function (chunk) {
        responseData += chunk;
        }); 

        response.on('end', function () {
            console.log(responseData);
        }); 
    }

    if(type == "rescue"){
        var param = querystring.stringify({
            'landing_page': "data",
            'dataType': "DA",
            'driver_name': userName,
            'conscious': '0',
            'location': '서울 구로구 항동',
            'accident_Time': accidentTime,
            'car_number': env.car_number
        });
    }
    if(type == "theft"){
        var param = querystring.stringify({
            'landing_page': "data",
            'dataType': "TA",
            'location': '서울 구로구 항동',
            'accident_Time': accidentTime,
            'car_number': env.car_number
        });
    }

    req = http.request(options, readJSONResponse);

    req.write(param);
    req.end();
}

function init(service, http){
    ls2 = service;
    server = http;
    io = require('socket.io')(server);
    luna.init(service);
    callListinit();
    var sockets;

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
exports.help_request = help_request;
exports.set_engine = set_engine;
exports.start_engine = start_engine;
