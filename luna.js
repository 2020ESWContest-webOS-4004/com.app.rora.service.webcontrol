var luna = undefined;

function rc_forward(callback){
    luna.call("luna-send -f -n 1 luna://com.app.rora.carcontrol.service", {}, callback);
}

function init(l){
    luna = l;
}

exports.rc_forward = rc_forward;