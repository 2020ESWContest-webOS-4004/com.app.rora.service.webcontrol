function rent_request() {
    document.getElementById("map").style.width="50%";
    document.getElementById("search").style.width="300px";
    document.getElementById("rent").style.display="block";
    document.getElementById("basic-addon1").innerText="";
    document.getElementById("rent_request").style.display="none";
    map.relayout();
    panTo();

    setDraggable(false);
    setMapClickEvent();
}

function rent_close() {
    document.getElementById("map").style.width="100%";
    document.getElementById("search").style.width="500px";
    document.getElementById("rent").style.display="none";
    document.getElementById("basic-addon1").innerText="";
    document.getElementById("rent_request").style.display="inline-block";
    map.relayout();
    panTo();

    setDraggable(true);
    removeMapClickEnent();
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
    hiddenField.setAttribute("value", "202020");

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

})

