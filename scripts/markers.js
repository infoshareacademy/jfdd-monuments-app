/**
 * Created by gosia on 20.01.16.
*/


////// ten marker nie będzie klikalny
//dodajMarker(54.3485481,18.6510355,{title: 'Muzeum y', clickable: false});
////
////// to będzie zwykły marker z tooltipem
//dodajMarker(54.3485481,18.6510355,{title: 'Muzeum xy'});
////


var map;
var lat = 54.3485481;
var lng = 18.6510855;
var zoom = 12;

function initialize() {
    var myLatlng = new google.maps.LatLng(lat, lng);
    var myOptions = {
        zoom: zoom,
        center: myLatlng,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), myOptions);
    var markers = [
        ['Neptun',  54.205487, 18.401211],
        ['Dluga', 54.3489369, 18.6517482],
        ['Brama Wyzynna', 54.349944, 18.646528],
        ['Ratusz Glownego Miasta', 54.34879,18.650375 ],
        ['Dwor Artusa', 54.348889,18.651417 ],
        ['Zlota Kamienica', 54.3486179,18.6516125],
        ['Bazylika Mariacka', 54.350634,18.656312],
        ['Dom Uphagena', 54.3492611,18.6470826],
        ['Zuraw', 54.350646,18.655345],
        ['Muzeum Archeologiczne', 54.3498348,18.6510907 ],
        ['Kosciol sw. Mikolaja', 54.1809393,18.1897574 ],
        ['Zabi Kruk', 54.3560702,18.6466264],
        ['Oliva Bussiness Center', 54.3560702,18.6466264],
        ['Hevelianum', 54.355801,18.637166],
        ['Pomnik Poległych Stoczniowców', 54.3605478,18.6468071],
        ['Muzeum Solidarnosci', 54.3605474,18.6402142],
        ['Martwa Wisla', 54.3494746,18.6429141],
        ['Kanal na Stepce', 54.3524662,18.6583352],
        ['Dlugi Targ', 54.3483121,18.6518724],
        ['Zlota Brama', 54.3497813,18.6457724]


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
