var center_Location_Latitude = 37.487113;
var center_Location_Longitude = 126.825320;
var container = document.getElementById('map');
var options = {
    center: new kakao.maps.LatLng(center_Location_Latitude, center_Location_Longitude),
    level: 4
};

var map = new kakao.maps.Map(container, options);

/*
// 마커가 표시될 위치입니다 
var markerPosition  = new kakao.maps.LatLng(37.487113, 126.825320); 

    
// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition
});


marker.setMap(map);
*/

// 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
marker_repositon = kakao.maps.event.addListener(map, 'center_changed', function() {

    // 지도의  레벨을 얻어옵니다
    var level = map.getLevel();

    // 지도의 중심좌표를 얻어옵니다 
    var latlng = map.getCenter(); 

    var message = '<p>지도 레벨은 ' + level + ' 이고</p>';
    message += '<p>중심 좌표는 위도 ' + latlng.getLat() + ', 경도 ' + latlng.getLng() + '입니다</p>';

    console.log(message);

    marker.setPosition(latlng);
});


var marker = new kakao.maps.Marker();

// 타일 로드가 완료되면 지도 중심에 마커를 표시합니다
kakao.maps.event.addListener(map, 'tilesloaded', displayMarker);

function displayMarker() {
    
    // 마커의 위치를 지도중심으로 설정합니다 
    marker.setPosition(map.getCenter()); 
    marker.setMap(map); 

    // 아래 코드는 최초 한번만 타일로드 이벤트가 발생했을 때 어떤 처리를 하고 
    // 지도에 등록된 타일로드 이벤트를 제거하는 코드입니다 
    // kakao.maps.event.removeListener(map, 'tilesloaded', displayMarker);
}



// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// 지도 크기 변경시, 계속 중앙좌표 표시
function panTo() {
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(center_Location_Latitude, center_Location_Longitude);
    
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);            
}        


