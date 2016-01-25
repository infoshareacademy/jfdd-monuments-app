/**
 * Created by gosia on 20.01.16.
 */
//$(document).ready(function() {
//});
//var myLatlng = new google.maps.LatLng(54.3485481,18.6510355);
//var mapOptions = {
//    zoom: 14,
//    center: myLatlng
//}
//var cityTown = new google.maps.Map(document.getElementById("map"), mapOptions);
//var marker = new google.maps.Marker({
//    position: myLatlng
//});
//// //
//// //ten marker będzie przesuwalny
//dodajMarker(54.3485481,18.6510355,{title: 'Muzeum x', draggable: true});
////
////// ten marker nie będzie klikalny
//dodajMarker(54.3485481,18.6510355,{title: 'Muzeum y', clickable: false});
////
////// to będzie zwykły marker z tooltipem
//dodajMarker(54.3485481,18.6510355,{title: 'Muzeum xy'});
////


var map;
var lat = 54.3485481;
var lng = 18.6510855;
var zoom = 14;

function initialize() {
    var myLatlng = new google.maps.LatLng(lat, lng);
    var myOptions = {
        zoom: zoom,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), myOptions);
    var markers = [
        ['Neptun', 54.3485481, 18.6510855],
        ['Dluga', 54.3489369, 18.6517482],
        ['Brama Wyzynna', 54.3479181, 18.65359]

    ];

    var draftMarker, myLatLng, marker;

    for (var i = 0; i < markers.length; i++) {
        draftMarker = markers[i];
        myLatLng = new google.maps.LatLng(draftMarker[1], draftMarker[2]);
        marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: draftMarker[0]
        });

        marker.setMap(map);
    }

}

google.maps.event.addDomListener(window, 'load', initialize);
