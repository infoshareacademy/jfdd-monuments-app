
function fetchZabytki() {
    console.log('fetch zabytki');
    $.ajax({
        url: 'data/dane-zabytkow.csv',
        success: function(csvZabytki) {
            console.log('FETCHED', csvZabytki);

            var daneZabytkow = CSV2JSON (csvZabytki, ',');

            console.log(daneZabytkow);

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
