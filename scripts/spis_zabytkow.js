//var cathegories = [];

function listaZabytkowWTablicach() {
	console.log('Trwa skomplikowany proces zaciągania danych :)');
	$.ajax({
		url: 'data/spis_zabytkow3.csv',
		success: function(csvZabytki) {

			var daneZabytkow = CSVToArray(csvZabytki, ';');

			console.log('Znaleziono ' + daneZabytkow.length + ' wszystkich zabytkow');

			//Wyławiamy zabtków WAŻNYCH (z wpisem do rejestru zabytków)
			var daneZabytkowRejestr = daneZabytkow.filter(function(element, index) {
				if (element[4] != '') {
					return true;
				} else {
					return false;
				}
			});

			//Wyławiamy CMENTARZE
			var daneZabytkowCmentarze = daneZabytkow.filter(function(element, index) {
				if (element[3].indexOf('cmentarz') >= 0) {
					return true;
				} else {
					return false;
				}
			});
			console.log('Znaleziono ' + daneZabytkowCmentarze.length + ' cmentarzy');

			//Wyławiamy DOMY
			var daneZabytkowDomy = daneZabytkow.filter(function(element, index) {
				if (element[3].indexOf('dom') >= 0) {
					return true;
				} else {
					return false;
				}
			});
			console.log('Znaleziono ' + daneZabytkowDomy.length + ' domów');

			//Wyławiamy KAMIENICE
			var daneZabytkowKamienice = daneZabytkow.filter(function(element, index) {
				if (element[3].indexOf('kamienic') >= 0) {
					return true;
				} else {
					return false;
				}
			});
			console.log('Znaleziono ' + daneZabytkowKamienice.length + ' kamienic');

			//Wyławiamy KOŚCIOLY
			var daneZabytkowKoscioly = daneZabytkow.filter(function(element, index) {
				if (element[3].indexOf('kościół') >= 0) {
					return true;
				} else {
					return false;
				}
			});
			console.log('Znaleziono ' + daneZabytkowKoscioly.length + ' kościołów');


			//Wyławiamy WIADUKTY
			var daneZabytkowWiadukty = daneZabytkow.filter(function(element, index) {
				if (element[3].indexOf('wiadukt') >= 0) {
					return true;
				} else {
					return false;
				}
			});
			console.log('Znaleziono ' + daneZabytkowWiadukty.length + ' wiaduktów');




			$('#SpisZabytkowRejestr').append('<table id="lista"></table>');
			var element;
			var liczbaZabytkowNaStrone = 20;
			for(var i = 0; i < daneZabytkowRejestr.length; i++) {
				element = daneZabytkowRejestr[i];
				$('#lista').append('<tr class="' + (i >= liczbaZabytkowNaStrone ? 'hidden' : '') + '"><td>' + element[0] + '</td><td>' + element[3] + '</td><td>' + element[1] + '</td><td>' + element[2] + '</td> </tr>');
			}
			$('#SpisZabytkowRejestr')
				.append('<p><a class="btn btn-default poprzednie">Poprzednie</a> <a class="btn btn-default nastepne">Następne</a></p>');


			$('#SpisZabytkowCmentarze').append('<table id="listaCmentarze"></table>');
			var elementCmentarz;
			for(var i = 0; i < daneZabytkowCmentarze.length; i++) {
				elementCmentarz = daneZabytkowCmentarze[i];
				$('#listaCmentarze').append('<tr class="' + (i >= liczbaZabytkowNaStrone ? 'hidden' : '') + '"><td>' + elementCmentarz[0] + '</td><td>' + elementCmentarz[3] + '</td><td>' + elementCmentarz[1] + '</td><td>' + elementCmentarz[2] + '</td> </tr>');
			}
			$('#SpisZabytkowCmentarze')
				.append('<p><a class="btn btn-default poprzednie">Poprzednie</a> <a class="btn btn-default nastepne">Następne</a></p>');


			$('#SpisZabytkowDomy').append('<table id="listaDomy"></table>');
			var elementDomy;
			for(var i = 0; i < daneZabytkowDomy.length; i++) {
				elementDomy = daneZabytkowDomy[i];
				$('#listaDomy').append('<tr class="' + (i >= liczbaZabytkowNaStrone ? 'hidden' : '') + '"><td>' + elementDomy[0] + '</td><td>' + elementDomy[3] + '</td><td>' + elementDomy[1] + '</td><td>' + elementDomy[2] + '</td> </tr>');
			}
			$('#SpisZabytkowDomy')
				.append('<p><a class="btn btn-default poprzednie">Poprzednie</a> <a class="btn btn-default nastepne">Następne</a></p>');


			$('#SpisZabytkowKoscioly').append('<table id="listaKoscioly"></table>');
			var elementKosciol;
			for(var i = 0; i < daneZabytkowKoscioly.length; i++) {
				elementKosciol = daneZabytkowKoscioly[i];
				$('#listaKoscioly').append('<tr class="' + (i >= liczbaZabytkowNaStrone ? 'hidden' : '') + '"><td>' + elementKosciol[0] + '</td><td>' + elementKosciol[3] + '</td><td>' + elementKosciol[1] + '</td><td>' + elementKosciol[2] + '</td> </tr>');
			}
			$('#SpisZabytkowKoscioly')
				.append('<p><a class="btn btn-default poprzednie">Poprzednie</a> <a class="btn btn-default nastepne">Następne</a></p>');


			$('#SpisZabytkowWiadukty').append('<table id="listaWiadukty"></table>');
			var elementWiadukty;
			for(var i = 0; i < daneZabytkowWiadukty.length; i++) {
				elementWiadukty = daneZabytkowWiadukty[i];
				$('#listaWiadukty').append('<tr class="' + (i >= liczbaZabytkowNaStrone ? 'hidden' : '') + '"><td>' + elementWiadukty[0] + '</td><td>' + elementWiadukty[3] + '</td><td>' + elementWiadukty[1] + '</td><td>' + elementWiadukty[2] + '</td> </tr>');
			}
			$('#SpisZabytkowWiadukty')
				.append('<p><a class="btn btn-default poprzednie">Poprzednie</a> <a class="btn btn-default nastepne">Następne</a></p>');



			$('.nastepne').click(function() {
				var $lista = $(this).parent().prev();
				var $nastepne = $lista.find('tr:visible').last().nextAll();
				if($nastepne.length) {
					$lista.find('tr:visible').addClass('hidden');
					for(var i = 0; i < liczbaZabytkowNaStrone; i++) {
						if(!$nastepne[i]) {
							break;
						}
						$nastepne.eq(i).removeClass('hidden');
					}
				}
			});
			$('.poprzednie').click(function() {
				var $lista = $(this).parent().prev();
				var $poprzednie = $lista.find('tr:visible').first().prevAll();
				if($poprzednie.length) {
					$lista.find('tr:visible').addClass('hidden');
					for(var i = 0; i < liczbaZabytkowNaStrone; i++) {
						if(!$poprzednie[i]) {
							break;
						}
						$poprzednie.eq(i).removeClass('hidden');
					}
				}
			});




			$('#typyZabytkow').change(function() {
				$('.listaZabytkowWgTypu').addClass('hidden');
				console.log($(this).val());
				$('#' + $(this).val()).removeClass('hidden');
			})


		},
		error: function(err, std) {
			console.debug('ERROR', err, std);
		}
	});
}

$(document).ready(function() {
	listaZabytkowWTablicach();
});