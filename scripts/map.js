/**
 * Created by gosia on 19.01.16.
 */

$(document).ready(function() {

    function initialize() {
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: new google.maps.LatLng( 54.33, 18.60),
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);
    }
    google.maps.event.addDomListener(window, 'load', initialize);

});
var gdansk=new google.maps.LatLng(54.33,18.60);
function initialize()
{
    var mapProp = {
        center:gdansk,
        zoom:11,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"),mapProp);
    var myCity = new google.maps.Circle({
        center:gdansk,
        radius:800,
        strokeColor:"#0000FF",
        strokeOpacity:0.8,
        strokeWeight:2,
        fillColor:"#0000FF",
        fillOpacity:0.4
    });

    myCity.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);
