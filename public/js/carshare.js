function rent_request() {
    document.getElementById("map").style.width="50%";
    document.getElementById("search").style.width="300px";
    document.getElementById("rent").style.display="block";
    document.getElementById("basic-addon1").innerText="";
    document.getElementById("rent_request").style.display="none";
    map.relayout();
    panTo();
}

