var container = document.getElementById('map');
var options = {
    center: new kakao.maps.LatLng(37.487113, 126.825320),
    level: 4
};

var map = new kakao.maps.Map(container, options);


var markers = [];

window.onload = function() {        

    for(var i=0; i<=1; i++) {
        markers[i] = {
            clicked : false,
            marker : new kakao.maps.Marker({
                    clickable: true
                    })
        }

        console.log(markers[i]);
    }
}

/*
// 지도를 클릭한 위치에 표출할 마커입니다
var marker = new kakao.maps.Marker({ 
    // 지도 중심좌표에 마커를 생성합니다 
    position: map.getCenter() 
}); 
// 지도에 마커를 표시합니다
marker.setMap(map);
*/

// 지도에 클릭 이벤트를 등록합니다
// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
    for(var i=0; i<=1; i++) {
        if(markers[i].clicked)
            var marker = markers[i].marker;
            
    }

    if(marker) {
        console.log(marker);
        // 클릭한 위도, 경도 정보를 가져옵니다 
        var latlng = mouseEvent.latLng; 
        
        // 마커 위치를 클릭한 위치로 옮깁니다
        marker.setPosition(latlng);

        marker.setMap(map);
        
        var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
        message += '경도는 ' + latlng.getLng() + ' 입니다';
        
        var resultDiv = document.getElementById('result'); 
        resultDiv.innerHTML = message;
        
        marker.clicked = false;
        console.log(markers[0].clicked);
        console.log(markers[1].clicked);
    }
});

function onClick_first_button() {
    markers[0].clicked = true;
    console.log(markers[0].clicked);
    console.log(markers[1].clicked);
}

function onClick_second_button() {
    console.log(markers[0].clicked);
    markers[1].clicked = true;
    console.log(markers[1].clicked);
}

document.getElementById('first_choice').addEventListener('click', onClick_first_button);
document.getElementById('second_choice').addEventListener('click', onClick_second_button);
