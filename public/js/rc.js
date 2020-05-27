function forward(){
    var data = "hello";
    socket.emit("forward", data);
}

function backward(){
    alert('backward');
}

function right(){
    alert('right');
}

function left(){
    alert('left');
}

function stop(){
    alert('stop');
}