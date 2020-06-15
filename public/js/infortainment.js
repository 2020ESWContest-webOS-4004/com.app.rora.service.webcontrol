function start_engine(){
    var data = {"name":"start_engine"};
    socket.emit("ls-call", data);
    document.getElementById("lock_icon").style.color = "green";
    document.getElementById("btn_engine").value = "Engine Stop";
    document.getElementById("btn_engine").onclick = stop_engine;
}

function stop_engine(){
    var data = {"name":"stop_engine"};
    socket.emit("ls-call", data);
    document.getElementById("lock_icon").style.color = "#a4113e";
    document.getElementById("btn_engine").value = "Engine Start";
    document.getElementById("btn_engine").onclick = start_engine;
}

function auth_user(){
    var data = {"name": "auth_user"};
    socket.emit("ls-call", data);
}

function get_engine_status(){
    var data = {"name":"get_engine_status"};
    socket.emit("ls-call", data);
}

function welcom_voice(){
    var data = {"name": "welcome_voice"}
    socket.emit("ls-call", data);
}