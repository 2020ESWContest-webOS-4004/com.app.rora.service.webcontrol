function opencamera(){
    //document.getElementById("face-auth-camera").src = "https://algorithmxlab.com/wp-content/uploads/2019/11/Facial-Recognition-All-you-Need-to-Know.jpg";
    document.getElementById("face-auth-camera").src = "http://192.168.1.15:5000/video_feed";
    document.getElementById("face-auth-text-span").innerHTML = '얼굴 인식 중...';
    document.getElementById("reservation-result-area").style="display:none";
}

function closecamera(){
    document.getElementById("face-auth-camera").src = "./media/face-auth.png";
    document.getElementById("reservation-status-text").className = "reservation-wait";
    document.getElementById("reservation-status-mark").className = "fas fa-spinner fa-pulse fa-3x";
    document.getElementById("reservation-status-mark").style="color:#222A35";
    document.getElementById("reservation-result-area").style="display:none";
    document.getElementById("face-auth-text-span").innerHTML = '얼굴인식을 시작하려면 창문을 두드려주세요';
    document.getElementById("reservation-status-text").innerHTML = "대기중";
}

function face_auth_success(information){
    document.getElementById("reservation-status-text").className = "reservation-success";
    document.getElementById("reservation-status-mark").className = "fas fa-check-circle fa-3x";
    document.getElementById("reservation-status-mark").style="color:#3BB54A";
    document.getElementById("jarvisuser").innerHTML = information.username;
    document.getElementById("reservation-result-area").style="display:block";
    document.getElementById("face-auth-text-span").innerHTML = '얼굴인식 완료';
    document.getElementById("reservation-status-text").innerHTML = '인증성공';
}

function face_auth_fail(){
    //
    closecamera();
    document.getElementById("reservation-status-text").className = "reservation-fail";
    document.getElementById("reservation-status-mark").className = "fas fa-times-circle fa-3x";
    document.getElementById("reservation-status-mark").style="color:#E04F5F";
    document.getElementById("reservation-result-area").style="display:none";
    document.getElementById("face-auth-text-span").innerHTML = '얼굴인식 완료';
    document.getElementById("reservation-status-text").innerHTML = '인증실패';
}