// a collection of Luna service calls
var ls2 = undefined;

function init(s){
    ls2 = s;
}

function rc_forward(param, callback){
    ls2.call("luna://com.app.rora.service.carcontrol/forward", param, callback);
}

function rc_backward(param, callback){
    ls2.call("luna://com.app.rora.service.carcontrol/backward", param, callback);
}

function rc_right(param, callback){
    ls2.call("luna://com.app.rora.service.carcontrol/right", param, callback);
}

function rc_left(param, callback){
    ls2.call("luna://com.app.rora.service.carcontrol/left", param, callback);
}

function rc_stop(param, callback){
    ls2.call("luna://com.app.rora.service.carcontrol/stop", param, callback);
}

function tts(text, callback){
    ls2.call("luna://com.webos.service.tts/speak", {"text":text, "language": "ko-KR", "clear":true}, callback);
}

function get_infrared_value(param, callback){
    ls2.call("luna://com.app.rora.service.carcontrol/get_infrared_value", param, function(m){
        callback(m);
    });
}

exports.init = init;
exports.rc_forward = rc_forward;
exports.rc_backward = rc_backward;
exports.rc_right = rc_right;
exports.rc_left = rc_left;
exports.rc_stop = rc_stop;
exports.get_infrared_value = get_infrared_value;
exports.tts = tts;