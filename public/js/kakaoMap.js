var center_Location_Latitude = 37.487113;
var center_Location_Longitude = 126.825320;

var container = document.getElementById('map');
var options = {
    center: new kakao.maps.LatLng(center_Location_Latitude, center_Location_Longitude),
    level: 4
};

// 지도를 생성합니다.
var map = new kakao.maps.Map(container, options);

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

// 클릭한 위치를 표시할 마커입니다
var marker = new kakao.maps.Marker();

// 커스텀 오버레이를 생성합니다
var mapCustomOverlay = new kakao.maps.CustomOverlay({
    xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본은 0.5 입니다
    yAnchor: 1.2 // 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본은 0.5 입니다
});

var ps = new kakao.maps.services.Places();

//--------------------------------------------------선언부----------------------------------------------------------//

// 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'center_changed', setMarkerAndInfowindow);

// 타일 로드가 완료되면 지도 중심에 마커를 표시합니다
kakao.maps.event.addListener(map, 'tilesloaded', setMarkerAndInfowindow);

function setMarkerAndInfowindow() {
    searchDetailAddrFromCoords(map.getCenter(), function (result, status) {
        if (status === kakao.maps.services.Status.OK) {

            var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
            detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
            /*
                        var add_content = '<div class="info_address">' +
                            '<span class="title">법정동 주소정보</span>' +
                            detailAddr +
                            '</div>';
                        */

            // 커스텀 오버레이에 표시할 내용입니다
            // HTML 문자열 또는 Dom Element 입니다
            var app_content = '<div class="info_address">';
            app_content += '    <div class="title"<strong>주소 정보</strong></div>';
            app_content += '    <div class="desc">';
            app_content += '        <span class="address">' + detailAddr + '</span>';
            app_content += '    </div>';
            app_content += '</div>';

            // 마커의 위치를 지도중심으로 설정합니다 
            marker.setPosition(map.getCenter());
            marker.setMap(map);

            /*
            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
            infowindow.setContent(add_content);
            infowindow.open(map, marker);
            */


            mapCustomOverlay.setPosition(map.getCenter());
            mapCustomOverlay.setContent(app_content);
            mapCustomOverlay.setMap(map);

        }
    });
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

function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}


// 버튼 클릭에 따라 지도 이동 기능을 막거나 풀고 싶은 경우에는 map.setDraggable 함수를 사용합니다
function setDraggable(draggable) {
    // 마우스 드래그로 지도 이동 가능여부를 설정합니다
    map.setDraggable(draggable);
}

// 대여하기 버튼을 누른 후, 다시 초기화 할때 함수를 사용합니다.
function setMapClickEvent() {

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        rent_close();
    });
}

// 초기화를 완료한 후 이벤트리스너를 삭제합니다.
function removeMapClickEnent() {
    kakao.maps.event.removeListener(map, 'click');
}

// 주소로 검색하여 좌표를 추출할 때 사용합니다.
function addressSearchFromAddress(text) {
    geocoder.addressSearch(text, function (result, status) {
        /* if (status === kakao.maps.services.Status.ERROR) {
            console.log('address search error');
        } */
        if (status === kakao.maps.services.Status.ZERO_RESULT) {
            console.log('검색 결과가 존재하지 않습니다.');
        }

        if (status === kakao.maps.services.Status.OK) {
            address_search_displayresult(text, result);
        }
    });
}

// 키워드로 검색하여 좌표를 추출할 때 사용합니다.
function addressSearchFromKeyword(text) {
    ps.keywordSearch(text, function (data, status, pagination) {
        /* if (status === kakao.maps.services.Status.ERROR) {
            console.log('keyword search error');
        } */
        if (status === kakao.maps.services.Status.ZERO_RESULT) {
            console.log('검색 결과가 존재하지 않습니다.');
        }

        if (status === kakao.maps.services.Status.OK) {

            keyword_search_displayresult(text, data);

        }
    });
}

function address_search_displayresult(text, result) {
    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

    searchDetailAddrFromCoords(coords, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var result_box = document.getElementById('address_search_result_print');
            var result_card = document.createElement('div');

            if (result[0].road_address == null) {
                var address_name = result[0].address.address_name;

                //var address_area = '<a onclick="changeMapPosition('+ coords + ')' + '<div class="result_card">';
                var address_area = '<a><div class="result_card">';
                address_area += '<div class="address">' + address_name + '</div>';
                address_area += '</div></a>';
            }
            else {
                var address_name = result[0].address.address_name;
                var road_address_name = result[0].road_address.address_name;
                var building_name = result[0].road_address.building_name;

                var address_area = '<a><div class="result_card">';
                address_area += '<div class="address">' + building_name + '</div>';
                address_area += '<div class="road_address">' + address_name + '</div>';
                address_area += '<div class="road_address">' + road_address_name + '</div>';
                address_area += '</div></a>';
            }

            result_card.innerHTML = address_area;

            result_box.innerHTML = '';
            result_box.appendChild(result_card);
        }
    });
}

function keyword_search_displayresult(text, data) {
    for (let i = 0; i < data.length; i++) {

        var coords = new kakao.maps.LatLng(data[i].y, data[i].x);
        searchDetailAddrFromCoords(coords, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                var result_box = document.getElementById('keyword_search_result_print');
                var result_card = document.createElement('div');

                if (result[0].road_address == null) {
                    var address_name = result[0].address.address_name;
                    var place_name = data[i].place_name;

                    var address_area = '<div class="result_card">';
                    address_area += '<div class="address">' + place_name + '</div>';
                    address_area += '<div class="road_address">' + address_name + '</div>';
                    address_area += '</div>';
                }
                else {
                    var address_name = result[0].address.address_name;
                    var road_address_name = result[0].road_address.address_name;
                    var building_name = result[0].road_address.building_name;
                    var place_name = data[i].place_name;

                    var address_area = '<div class="result_card">';
                    address_area += '<div class="address">' + place_name + '(' + building_name + ')' + '</div>';
                    address_area += '<div class="road_address">' + address_name + '</div>';
                    address_area += '<div class="road_address">' + road_address_name + '</div>';
                    address_area += '</div>';
                }

                result_card.innerHTML = address_area;


                result_box.appendChild(result_card);
            }
        });
    }

}

//지정한 좌표로 맵 이동
function changeMapPosition(position) {
    map.setCenter(new kakao.maps.LatLng(position));

}