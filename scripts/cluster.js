/**
 * Created by Lukasz on 2016-01-25.
 */


var markers = [];
for (var i = 0; i < 100; ++i) {
    var latlng = new GLatLng(data.photos[i].latitude, data.photos[i].longitude);
    var marker = new GMarker({'position': latlng});
    markers.push(marker);
}
var markerCluster = new MarkerClusterer(map, markers);


var map = null;
var markers = [];
var markerClusterer = null;
function initialize() {
    if(GBrowserIsCompatible()) {
        map = new GMap2(document.getElementById('map'));
        map.setCenter(new GLatLng(39.91, 116.38), 2);
        map.addControl(new GLargeMapControl());
        map.addControl(new GMapTypeControl());
        var icon = new GIcon(G_DEFAULT_ICON);
        icon.image = "http://chart.apis.google.com/chart?cht=mm&chs=24x32&chco=FFFFFF,008CFF,000000&ext=.png";
        for (var i = 0; i < 1000; ++i) {
            var latlng = new GLatLng(data.photos[i].latitude, data.photos[i].longitude);
            var marker = new GMarker(latlng, {icon: icon});
            markers.push(marker);
        }
        refreshMap();
    }
}
function refreshMap() {
    if (markerClusterer != null) {
        markerClusterer.clearMarkers();
    }
    var zoom = parseInt(document.getElementById("zoom").value, 10);
    var size = parseInt(document.getElementById("size").value, 10);
    var style = document.getElementById("style").value;
    zoom = zoom == -1 ? null : zoom;
    size = size == -1 ? null : size;
    style = style == "-1" ? null: parseInt(style, 10);
    markerClusterer = new MarkerClusterer(map, markers, {maxZoom: zoom, gridSize: size, styles: styles[style]});
}