function forward(){
    var data = "hello";
    socket.emit("forward", data);
}

function backward(){
    var data = "hello";
    socket.emit("backward", data);
}

function right(){
    var data = "hello";
    socket.emit("right", data);
}

function left(){
    var data = "hello";
    socket.emit("left", data);
}

function stop(){
    var data = "hello";
    socket.emit("stop", data);
}

function reboot(){
    var data = "hello";
    socket.emit("reboot", data);
}