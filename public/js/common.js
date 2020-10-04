function goBack() {
    window.history.back();
}

function gotoEnd() {
    window.location = '/share/end';
}

function print() {
    var temp = JSON.parse(document.getElementById('testinput2').value);
    //console.log(temp);
    console.log(temp);

    start_coordinate = JSON.parse(temp.start_coordinate);
    end_coordinate =JSON.parse(temp.end_coordinate);

    var coords1 = new kakao.maps.LatLng(start_coordinate.Ha, start_coordinate.Ga);
    var coords2 = new kakao.maps.LatLng(end_coordinate.Ha, end_coordinate.Ga);

    searchDetailAddrFromCoords(coords1, function(result, status) {
        if(result[0].road_address) {
            document.getElementById('start_location').innerText = result[0].road_address.address_name;
        } else { 
            document.getElementById('start_location').innerText = result[0].address.address_name;
        }
        
    })


    searchDetailAddrFromCoords(coords2, function(result, status) {
        if(result[0].road_address) {
            document.getElementById('end_location').innerText = result[0].road_address.address_name;
        } else { +1
            document.getElementById('end_location').innerText = result[0].address.address_name;
        }
        
    })

}

function pointUse() {
    let print_input = document.getElementById('finallyprice');
    let use_point = document.getElementById('use_point_input');
    let price_value = document.getElementById('totalprice');
    let save_point = document.getElementById('member_point');
    if(use_point.value != null && Number(use_point.value) < Number(save_point.value)) {
        if(use_point.value >= 100 || use_point.value == 0) {
            print_input.innerText= '총금액 : ' + (Number(price_value.value) - Number(use_point.value)) + '원';
        } else {
            alert('100포인트 이상부터 사용가능합니다.');
        }
    }

}