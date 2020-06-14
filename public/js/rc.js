function forward(){
    var data = {"name":"forward"};
    socket.emit("ls-call", data);
}

function backward(){
    var data = {"name":"backward"};
    socket.emit("ls-call", data);
}

function right(){
    var data = {"name":"right"};
    socket.emit("ls-call", data);
}

function left(){
    var data = {"name":"left"};
    socket.emit("ls-call", data);
}

function stop(){
    var data = {"name":"stop"};
    socket.emit("ls-call", data);
}