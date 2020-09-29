setInterval(getTime, 1000);

var center;

function rent_request() {
    center = getMapCenter();
    removeEvent_all();
    document.getElementById("map").style.width="50%";
    document.getElementById("search").style.width="300px";
    document.getElementById("rent").style.display="block";
    document.getElementById("search_bar_title").innerText="";
    document.getElementById("start_location_text").innerText= `출발장소 : ${addressName}`;
    document.getElementById("rent_request").style.display="none";
        
    map.relayout();
    panTo(center);

    setDraggable(false);
    setMapClickEvent();
}

function rent_close() {
    document.getElementById("map").style.width="100%";
    document.getElementById("search").style.width="500px";
    document.getElementById("search_bar_title").innerText="주소검색";
    document.getElementById("rent").style.display="none";
    document.getElementById("rent_request").style.display="inline-block";

    map.relayout();
    panTo(center);

    addMapEventAll();
    removeMapClickEnent();

    setDraggable(true);
}


function share_start() {
    method = "POST";
    path = "/share"

    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "time");
    hiddenField.setAttribute("value", Date());

    form.appendChild(hiddenField);
    
    document.body.appendChild(form);
    form.submit();
}


function search() {
    let address_str = document.getElementById("address_input").value;
    document.getElementById("address_search_result_print").innerHTML="";
    document.getElementById("keyword_search_result_print").innerHTML="";
    console.log(address_str);
    addressSearchFromAddress(address_str);
    addressSearchFromKeyword(address_str);    
}

document.getElementById('address_input').addEventListener('keyup', function(event) {
    if(document.getElementById('address_input').value != '') {
        document.getElementById('search_result_box').style.display = "block";        
        search();
    }
    else {
        document.getElementById('search_result_box').style.display = "none";  
    }

});
document.getElementById('address_input').addEventListener('blur', e => {
    document.getElementById('search_result_box').style.display = "none";  
});
document.getElementById('address_input').addEventListener('focus', e => {
    if (document.getElementById('address_input').value != '') {
        document.getElementById('search_result_box').style.display = "block";
        search();
    }
    else {
        document.getElementById('search_result_box').style.display = "none";
    }
});

function getTime() {
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    let currentDate = `출발시간 : ${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date} ${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    document.getElementById("start_time_text").innerHTML = currentDate;
}
