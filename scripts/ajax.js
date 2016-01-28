/**
 * Created by gosia on 21.01.16.
 */

function showMonumentsWithGeographicalData(data){
    data = JSON.parse(data);
    console.log(data);

    //data.sort(function (Obiekt){
    //    return parseString(ASC).Obiekt;
    //});


    var monumentsWithCords = data.filter(function (monument) {
        return  monument.Dlugosc && monument.Szerokosc;
    });

    var map;
    var lat = 54.3485481;
    var lng = 18.6510855;
    var zoom = 14;

    var myLatlng = new google.maps.LatLng(lat, lng);
    var myOptions = {
        zoom: zoom,
        center: myLatlng,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);

    var markerInstances = monumentsWithCords.map(function (monument) {
        var image = 'images/blue_MarkerZ.png';
        var myLatLng = new google.maps.LatLng(monument.Dlugosc, monument.Szerokosc);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: monument.Obiekt,
            icon: image
        });

        return marker;
    });

    markerInstances.forEach(function (marker) {
        marker.setMap(map);
    });