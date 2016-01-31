//
//$(document).ready(function() {
//
//});

var map;
//var gdansk=new google.maps.LatLng(54.349222, 18.65025);
//function initialize()
//{
//    var mapProp = {
//        center:gdansk,
//        zoom:11,
//        mapTypeId:google.maps.MapTypeId.ROADMAP
//    };

//    var map = new google.maps.Map(document.getElementById("map"),mapProp);
//    var myCity = new google.maps.Circle({
//        center:gdansk,
//        radius:800,
//        strokeColor:"#F4A460",
//        strokeOpacity:0.8,
//        strokeWeight:2,
//        fillColor:"#F4A460",
//        fillOpacity:0.4
//    });
//
//    myCity.setMap(map);
//}
//google.maps.event.addDomListener(window, 'load', initialize);
//
// wspolrzedne Gdanska
var myCenter=new google.maps.LatLng(54.349333, 18.65025);

//mapa Europy
function initialize()
{
    var mapProp = {
        center: myCenter,
        zoom:5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

     map = new google.maps.Map(document.getElementById("map"),mapProp);

    var marker = new google.maps.Marker({
        position: myCenter,
        scrollwheel: false,
        title:'Click to zoom'
    });

    marker.setMap(map);

    //var infowindow = new google.maps.InfoWindow({
    //    content:"Polska,jeden z najpiekniejszych krajow na swiecie, <br />" +
    //    "jesli nie najpiekniejszy"
    ////});
    //infowindow.open(map, marker);


// po kliknieciu na markera, ustawiony zoom na Gdansk
    google.maps.event.addListener(marker,'click',function() {
        map.setZoom(12);
        map.setCenter(marker.getPosition());
    });
}
google.maps.event.addDomListener(window, 'load', initialize);


/* markery muza Gdanska */