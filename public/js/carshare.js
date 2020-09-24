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

function search() {
    let address_str = document.getElementById("address_input").value;
    document.getElementById("address_search_result_print").innerHTML="";
    document.getElementById("keyword_search_result_print").innerHTML="";
    console.log(address_str);
    addressSearchFromAddress(address_str);
    addressSearchFromKeyword(address_str);    
}

function test(){  
    var inputBox = document.getElementById("address_input");             
    var testDiv = document.getElementById("search_result_box");             
    testDiv.style.top=inputBox.offsetTop+inputBox.offsetHeight;  
    testDiv.style.left=inputBox.offsetLeft;  
      
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
/* document.getElementById('address_input').addEventListener('focus', function() {
    document.getElementById('search_result_box').style.display = "block";
});
 */
/* document.getElementById('address_input').addEventListener('focusout', function() {
    document.getElementById('search_result_box').style.display = "none";
}) */

