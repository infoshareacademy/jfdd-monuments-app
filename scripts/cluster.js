/**
 * Created by Lukasz on 2016-01-25.
 */

//****************tworzenie markerów*********************

//var markers = [];
//for (var i = 0; i < 100; ++i) {
//    var latlng = new GLatLng(data.photos[i].latitude, data.photos[i].longitude);
//    var marker = new GMarker({'position': latlng});
//    markers.push(marker);
//}


//***************tworzenie klastrów***************************

var markerCluster = new MarkerClusterer(map, markers);

//****plus dodanie biblioteki

