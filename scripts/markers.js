/**
 * Created by Gosia on 20.01.16.
*/
var map;
var lat = 54.3485481;
var lng = 18.6510855;
var zoom = 14;

function initialize() {
    var myLatlng = new google.maps.LatLng(lat, lng);
    var myOptions = {
        zoom: zoom,
        center: myLatlng,
        //scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), myOptions);
    var markers = [
        ['Neptun',  54.205487, 18.401211],
        ['Brama Sw Ducha', 54.349944, 18.646528],
        ['Ratusz Glownego Miasta', 54.34879,18.650375 ],
        ['Dwor Artusa', 54.348889,18.651417 ],
        ['Zielona Brama', 54.3486179,18.6516125],
        ['Dom Uphagena', 54.3492611,18.6470826],
        ['Zuraw', 54.350646,18.655345],
        ['Bazylika', 54.3498348,18.6510907 ],
        ['Zabi Kruk', 54.3560702,18.6466264],
        ['Oliva Bussiness Center', 54.3560702,18.6466264],
        ['Biskupia Gorka', 54.3605474,18.6402142],
        ['Kanal na Stępce', 54.3524662,18.6583352],
        ['Dlugi Targ', 54.3483121,18.6518724],
        ['Zlota Brama', 54.3497813,18.6457724],
        ['Baszta pod Zrebem', 54.342222, 18.648056],
        ['Muzeum Archeologiczne', 54.348572, 18.652406],
        ['Pomnik Poleglych Stoczniowcow', 54.3605478,18.6490011]
    ];

    var image = 'images/blue_MarkerZ.png';
    var draftMarker, myLatLng, marker;
    for (var i = 0; i < markers.length; i++) {
        draftMarker = markers[i];
        myLatLng = new google.maps.LatLng(draftMarker[1], draftMarker[2]);
        marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: draftMarker[0],
            icon: image
        });
        marker.setMap(map);
    }

}
google.maps.event.addDomListener(window, 'load', initialize);
