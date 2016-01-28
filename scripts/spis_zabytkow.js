var cathegories = [];

function listaZabytkowWTablicach() {
    console.log('Trwa skomplikowany proces zaciągania danych :)');
    $.ajax({
        url: 'data/spis_zabytkow3.csv',
        success: function(csvZabytki) {
            console.log('FETCHED', csvZabytki);

            var daneZabytkow = CSVToArray (csvZabytki, ';'), currentElementCathegory;

            console.log(daneZabytkow);

            var daneZabytkowWaznych = daneZabytkow.filter(function(element, index) {
                if (element[4] != "") {
                    currentElementCathegory = element[3];
                    if (cathegories.indexOf(currentElementCathegory) < 0 ) {
                        cathegories.push(currentElementCathegory);
                    }
                    return true;
                } else {
                    return false;
                }
            });

            console.log('Lista kategorii');
            console.log(cathegories);
            //console.log(daneZabytkowWaznych);

            $("#SpisZabytkowWaznych").append("<table>");
            $.each(daneZabytkowWaznych, function(index, element) {
                $("#SpisZabytkowWaznych").append("<tr><td>" + element[0] + "</td><td>" + element[3] + "</td><td>" + element[1] + "</td><td>" + element[2] + "</td> </tr>");
            });
            $("#SpisZabytkowWaznych").append("</table>");

        },
        error: function(err, std) {
            console.debug('ERROR', err, std);
        }
    });
}

$(document).ready(function() {
    listaZabytkowWTablicach();
});





