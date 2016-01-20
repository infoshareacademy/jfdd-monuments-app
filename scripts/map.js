/**
 * Created by gosia on 19.01.16.
 */

$(document).ready(function() {
    function initialize() {
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            //center: new google.maps.LatLng(44.5403, -78.5463),
            center: new google.maps.LatLng(44.5403, -78.5463),
            zoom: 7,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);
    }
    google.maps.event.addDomListener(window, 'load', initialize);

});

