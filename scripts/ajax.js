/**
 * Created by gosia on 21.01.16.
 */
function showMonumentsWithGeographicalData(data){


    data = JSON.parse(data);
    console.log(data);
    data.filter(function (monument) {
        return  monument.Obiekt  && monument.Ulica && monument.Nr && monument.Dlugosc && monument.Szerokosc;
    }).map(function(monument) {
        var html = '';
        html += '<td>' + monument.Obiekt + '</td>';
        html += '<td>' + monument.Ulica + '</td>';
        html += '<td>' + monument.Nr + '</td>';
        return html;
    }).forEach(function (htmlPart) {
        $('.rzeczywisteDane').append(
            '<tr data-role="Dane z rzeczywistego API">' +
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
