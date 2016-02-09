/**
 * Created by Gosia on 21.01.16.
 */
var markerInstances;
function showMonumentsWithGeographicalData(data){
    data = JSON.parse(data);
    console.log(data);

    var monumentsWithCords = data.filter(function (monument) {
        return  monument.Dlugosc && monument.Szerokosc;
    }).sort(function (a, b){

        return $.trim(a.Obiekt) > $.trim(b.Obiekt) ? 1 : -1;
    });

    var map;
    var lat = 54.3485481;
    var lng = 18.6510855;
    var zoom = 12;

    var myLatlng = new google.maps.LatLng(lat, lng);
    var myOptions = {
        zoom: zoom,
        center: myLatlng,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: true,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);

    var markerInstances = monumentsWithCords.map(function (monument, index) {
        var image = 'images/blue_MarkerZ.png';
        var myLatLng = new google.maps.LatLng(monument.Dlugosc, monument.Szerokosc);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: monument.Obiekt,
            icon: image,
            attributes: {id: index}
        });

        marker.addListener('click', function() {
            console.log("Clicked marker: " + marker);
            //showMonumentDetails(marker.attributes['id']);
        });

        return marker;
    });

    //markerInstances.forEach(function (marker) {
    //    marker.setMap(map);
    //});

    var markerClusterer = new MarkerClusterer(map, markerInstances); //grupowanie markerów w klastry

    /* ZAZNACZANIE WIERSZY W TABELI */
    markerInstances.forEach(function (marker) {
        marker.addListener('click', function () {
            //console.log(marker);
            var id = marker.attributes.id;

            $('#' + id).css({backgroundColor: '#CACACA'});
            showMonumentDetails(id); //podpina marker pod id

            $('select').val(id); // nasłuchuje po id i podpina klikniety marker pod wyświetlanie buttona
        });

         marker.addListener('click', function() {
            map.setZoom(17);
            map.setCenter(marker.getPosition());

        });
    });



    monumentsWithCords.map(function(monument) {
        var html = '';
        html += '<td><span class="dodajDoWycieczki"></span>' + monument.Obiekt + '</td>';
        html += '<td>' + monument.Ulica + '</td>';
        html += '<td>' + monument.Nr + '</td>';
        return html;
    }).forEach(function (htmlPart, index) {
        $('.rzeczywisteDane').append(
            '<tr id=' +index + ' data-role="Dane z rzeczywistego API">' +
            htmlPart +
            '</tr>'
        );
    });

    //CENTRE button -jQuery
    $('#resetMapy').click(function() {
        var minLat = 180;
        var maxLat = 0;
        var minLong = 180;
        var maxLong = 0;
        for (var i = 0; i < markerInstances.length; i++ ) {
            minLat = Math.min(minLat,markerInstances[i].getPosition().lat());
            maxLat = Math.max(maxLat,markerInstances[i].getPosition().lat());
            minLong = Math.min(minLong,markerInstances[i].getPosition().lng());
            maxLong = Math.max(maxLong,markerInstances[i].getPosition().lng());
        }
        map.setCenter(new google.maps.LatLng(
            ((minLat + maxLat) / 2.0),
            ((minLong + maxLong) / 2.0)
        ));
    });
}
function fetchZabytki() {
    console.log('fetch zabytki');
    $.ajax({
        url: 'data/dane-zabytkow.csv',
        success: function(csvZabytki) {
            var daneZabytkow = CSV2JSON (csvZabytki, ',');
            showMonumentsWithGeographicalData(daneZabytkow);
        },
        error: function(err, std) {
            console.debug('ERROR', err, std);
        }
    })
}
$(document).ready(function() {
    fetchZabytki();
});

