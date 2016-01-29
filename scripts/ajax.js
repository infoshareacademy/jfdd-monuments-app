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

    var markerClusterer = new MarkerClusterer(map, markerInstances);
    /* ZAZNACZANIE WIERSZY W TABELI */
    markerInstances.forEach(function (marker) {
        marker.addListener('click', function () {
            //console.log(marker);
            var id = marker.attributes.id;

            $('#' + id).css({backgroundColor: '#CACACA'});
            showMonumentDetails(id);

            $('select').val(id); //podpina klikniety marker pod buttona
        });

         marker.addListener('click', function() {
            map.setZoom(17);
            map.setCenter(marker.getPosition());

        });
    });



    monumentsWithCords.map(function(monument) {
        var html = '';
        html += '<td>' + monument.Obiekt + '</td>';
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

