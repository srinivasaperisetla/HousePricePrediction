
function getBathValue(){
    var uiBathrooms = document.getElementsByName('uiBathrooms');
    for(var i in uiBathrooms){
        if(uiBathrooms[i].checked){
            return parseInt(i) + 1;
        }
    }
    return -1; //invalid value
}

function getBHKValue(){
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK){
        if(uiBHK[i].checked){
            return parseInt(i) + 1;
        }
    }
    return -1; //invalid Value
}

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    
    var sqft = document.getElementById("uiSqft").value;
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations").value;
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url = "http://127.0.0.1:8000/predict_home_price";

    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            total_sqft: parseFloat(sqft),
            location: location,
            bhk: bhk,
            bath: bathrooms
        }),
        success: function(data) {
            console.log(data);
            console.log(data.estimated_price);
            estPrice.innerHTML = "<h2>" + data.estimated_price.toString()/10 + " Million Rupees</h2>";
        },
        error: function(xhr, status, error) {
            console.error("Error: " + xhr.responseText);
        }
    });
}


function onPageLoad() {
    console.log( "document loaded" );
     var url = "http://127.0.0.1:8000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    //var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards

    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
  }


  
  window.onload = onPageLoad;