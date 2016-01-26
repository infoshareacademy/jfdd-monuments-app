/**
 * Created by gosia on 21.01.16.
 */
function showMonumentsWithGeographicalData(data){
    var html = '<ul data-role="Dane z rzeczywistego API">';

    data = JSON.parse(data);
    console.log(data);
    data.filter(function (monument) {
        return monument.Dlugosc && monument.Szerokosc;
    }).map(function(monument) {
        var html = '';
        html += '<li>';
        html += '<h3>' + monument.Dlugosc + '</h3>';
        html += '<p>' + monument.Szerokosc + '</p>';
        html += '</li>';
        return html;
    }).forEach(function (htmlPart) {
        html += htmlPart;
    });

    html += '</ul>';
    $('.rzeczywisteDane').html(html);
}

function fetchZabytki() {
    console.log('fetch zabytki');
    $.ajax({
        url: 'data/dane-zabytkow.csv',
        success: function(csvZabytki) {
            //console.log('FETCHED', csvZabytki);

            var daneZabytkow = CSV2JSON (csvZabytki, ',');

            //console.log(daneZabytkow);

            showMonumentsWithGeographicalData(daneZabytkow);

            //wyswietlenie w konsoli wszytich zabytkow (f12)
        },
        error: function(err, std) {
            console.debug('ERROR', err, std);
        }
    })
}
$(document).ready(function() {
    fetchZabytki();
});
