/**
 * Created by gosia on 20.01.16.
 */

$(document).ready(function() {
});

//adding extra markers
var myLatlng = new google.maps.LatLng(54.3485481,18.6510355)

;
var mapOptions = {
    zoom: 14,
    center: myLatlng
}
var cityTown = new google.maps.Map(document.getElementById("map"), mapOptions);

var marker = new google.maps.Marker({
    position: myLatlng

});
