///**
// * Created by gosia on 19.01.16.
// */
//
//$(document).ready(function() {
//
//
//});
//
//var map;
//// wspolrzedne Gdanska
//var myCenter=new google.maps.LatLng(54.349333, 18.65025);
////
////////mapa Europy
//function initialize()
//{
//    var mapProp = {
//        center: myCenter,
//        zoom:5,
//        mapTypeId: google.maps.MapTypeId.ROADMAP
//    };
//
//     map = new google.maps.Map(document.getElementById("map"),mapProp);
//
//    var marker = new google.maps.Marker({
//        position: myCenter,
//        title:'Click to zoom'
//    });
//
//    marker.setMap(map);
//
//
//
//// po kliknieciu na markera, ustawiony zoom na Gdansk
//    google.maps.event.addListener(marker,'click',function() {
//        map.setZoom(14);
//        map.setCenter(marker.getPosition());
//    });
//}
//google.maps.event.addDomListener(window, 'load', initialize);
//
//
