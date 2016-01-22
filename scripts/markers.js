/**
 * Created by gosia on 20.01.16.
 */

$(document).ready(function() {
});





//adding extra markers
var myLatlng = new google.maps.LatLng(54.3489369,18.6517482);
var mapOptions = {
    zoom: 14,
    center: myLatlng
}
var cityTown = new google.maps.Map(document.getElementById("map"), mapOptions);






var marker = new google.maps.Marker({
    position: myLatlng

});

var marker2=

marker.setMap(cityTown);
