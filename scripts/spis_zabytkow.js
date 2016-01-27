function listaZabytkowWTablicach() {
    console.log('Trwa skomplikowany proces zaciągania danych :)');
    $.ajax({
        url: 'data/spis_zabytkow.csv',
        success: function(csvZabytki) {
            console.log('FETCHED', csvZabytki);

            var daneZabytkow = CSVToArray (csvZabytki, ';');

            console.log(daneZabytkow);

            var daneZabytkowWaznych = daneZabytkow.filter(function(element, index) {
                if (element[4] != "") {
                    return true;
                } else {
                    return false;
                }

            });

            console.log(daneZabytkowWaznych);

            $.each(daneZabytkowWaznych, function(index, element) {
                $("#SpisZabytkowWaznych").append("<p>" + element[3] + ", " + element[1] + " " + element[2] + "</p>");
            });


        },
        error: function(err, std) {
            console.debug('ERROR', err, std);
        }
    });
}

$(document).ready(function() {
    listaZabytkowWTablicach();
});





