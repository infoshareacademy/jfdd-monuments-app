/**
 * Created by gosia on 20.01.16.
 */
$(document).ready(function() {
    function initMap() {
        var myLatLng = {lat: 54.33, lng: 18.66};

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: myLatLng
        });

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Hello World!'
        });

        marker.setMap(map);
    }
})

