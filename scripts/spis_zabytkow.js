var cathegories = [];

function listaZabytkowWTablicach() {
    console.log('Trwa skomplikowany proces zaciągania danych :)');
    $.ajax({
        url: 'data/spis_zabytkow3.csv',
        success: function(csvZabytki) {

			var daneZabytkow = CSVToArray(csvZabytki, ';'), 
				currentElementCathegory;

            console.log('FETCHED ' + daneZabytkow.length + ' zabytkow');

            var daneZabytkowWaznych = daneZabytkow.filter(function(element, index) {
                if (element[4] != '') {
                    currentElementCathegory = element[3];
                    if (cathegories.indexOf(currentElementCathegory) < 0 ) {
                        cathegories.push(currentElementCathegory);
                    }
                    return true;
                } else {
                    return false;
                }
            });

            console.log('Liczba kategorii ' + cathegories.length);

            $('#SpisZabytkowWaznych').append('<table id="lista"></table>');
			var element;
			var liczbaZabytkowNaStrone = 20;
            for(var i = 0; i < daneZabytkowWaznych.length; i++) {
				element = daneZabytkowWaznych[i];
                $('#lista').append('<tr class="' + (i >= liczbaZabytkowNaStrone ? 'hidden' : '') + '"><td>' + element[0] + '</td><td>' + element[3] + '</td><td>' + element[1] + '</td><td>' + element[2] + '</td> </tr>');
            }
            $('#SpisZabytkowWaznych')
				.append('<p><a id="poprzednie" class="btn btn-default">Poprzednie</a> <a id="nastepne" class="btn btn-default">Następne</a></p>');
			
			$('#nastepne').click(function() {
				var $nastepne = $('#lista tr:visible').last().nextAll();
				if($nastepne.length) {
					$('#lista tr:visible').addClass('hidden');
					for(var i = 0; i < liczbaZabytkowNaStrone; i++) {
						if(!$nastepne[i]) {
							break;
						}
						$nastepne.eq(i).removeClass('hidden');
					}
				}
			});
			$('#poprzednie').click(function() {
				var $poprzednie = $('#lista tr:visible').first().prevAll();
				if($poprzednie.length) {
					$('#lista tr:visible').addClass('hidden');
					for(var i = 0; i < liczbaZabytkowNaStrone; i++) {
						if(!$poprzednie[i]) {
							break;
						}
						$poprzednie.eq(i).removeClass('hidden');
					}
				}
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





