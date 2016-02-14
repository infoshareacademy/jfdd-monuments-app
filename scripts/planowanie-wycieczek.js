/**
 * Created by Belion on 2016-02-09.
 */

$(function () {
	
	//obiekty Google maps api do rysowania tras - towrzenie
	var directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true }); //mamy juz swoje markery
	var directionsService = new google.maps.DirectionsService();
	//powiazanie z mapa
	directionsDisplay.setMap(map);

	function przerysujWycieczke() {
		//rysuje tylko gdy wycieczka ma co najmniej dwa punkty (jesli nie to nic nie robie)
		var liczbaPunktowTrasy = $('#edycjaWycieczki li').length;
		if(liczbaPunktowTrasy < 2) {
			return;
		}
		
		//biore markery kolejnych punktow wycieczki
		var wspolrzednePunktowWycieczki = $('#edycjaWycieczki li').map(function(nrNaLiscie, li) {
			var idZabytku = $(li).attr('data-id');
			return markerInstances[idZabytku].getPosition();
		});
		//punkty posrednie musza miec inny format - obiekt, ktory zawiera nie tylko wspolrzedne
		var punktyPosrednie = wspolrzednePunktowWycieczki.slice(1,-1);
		punktyPosrednie = punktyPosrednie.map(function(nr, pozycja) {
			return {
				location: pozycja,
				stopover: true
			};
		});
		var daneDoNarysowania = {
			origin: wspolrzednePunktowWycieczki[0],
			waypoints: punktyPosrednie,
			destination: wspolrzednePunktowWycieczki[liczbaPunktowTrasy - 1],
			travelMode: google.maps.TravelMode.WALKING
		};
		directionsService.route(daneDoNarysowania, function(result, status) {
			console.log(result);
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(result);
                directionsDisplay.setMap(map);

				var sumaOdleglosci = result.routes[0].legs.reduce(function(odleglosc, odcinek) {
					return odleglosc + odcinek.distance.value;
				},0);
				sumaOdleglosci = sumaOdleglosci / 1000;
				sumaOdleglosci = Math.round(sumaOdleglosci * 10 ) / 10;
				$('#dlugoscTrasy').text(sumaOdleglosci + ' km');

				var czasPrzejscia = result.routes[0].legs.reduce(function(czas, odcinek) {
					return czas + odcinek.duration.value;
				},0);
				czasPrzejscia = czasPrzejscia / 60;
				czasPrzejscia = Math.round(czasPrzejscia);
				$('#czasPrzejscia').text(czasPrzejscia + ' min');
			}
		});
	}
	
	function wyczyscTraseZMapy() {
		directionsDisplay.setMap(null);
		$('#dlugoscTrasy').text('');
		$('#czasPrzejscia').text('');
	}
	
    $("#edycjaWycieczki").sortable({
		//przerysowuje trase wycieczki gdy uzytkownik zmienil kolejnosc
		stop: function() {
			przerysujWycieczke();
		}
	});
    $("#edycjaWycieczki").disableSelection();

    for(var timeStamp in window.localStorage) { //wypisywanie listy istniejacych wycieczek
        if(timeStamp.match('^[0-9]{13}$')) {
            $('#zapisaneWycieczki').append('<li data-id="' + timeStamp + '"> \
                <div> \
                <button class="btn btn-primary btn-edytuj"> \
                EDYTUJ \
                </button> \
                <button class="btn btn-primary btn-usun"> \
                USUŃ \
                </button> \
                </div> \
                </li>');
            //wyciagam z localStor. li z zabytkami wchodzącymi w skład wycieczki i opakowuję w ol
            var wycieczka = '<ol data-id="' + timeStamp + '">' + window.localStorage.getItem(timeStamp) + '</ol>';
            $('#zapisaneWycieczki li:last').prepend(wycieczka);
        }
    }

    $(document).on('click', '.dodajDoWycieczki', function () {
        var nazwaZabytku = $(this).parent().text();
        var idZabytku = $(this).closest('tr').attr('id');
        var nowyPunktWycieczki = '<li data-id="' + idZabytku + '">' + nazwaZabytku + '<span class="usunZWycieczki"></span></li>';
        // console.log(nazwaZabytku, idZabytku, nowyPunktWycieczki);
        $('#edycjaWycieczki').append(nowyPunktWycieczki);

		//jesli jest juz co wysowac (co najmniej dwa punkty trasy) to przerysowuje na nowo trase wycieczki
		przerysujWycieczke();
    });

	$('#edycjaWycieczki').on('click', '.usunZWycieczki', function() {
		var zabytekDoUsuniecia = $(this).parent();
		zabytekDoUsuniecia.remove();
		if ($('#edycjaWycieczki li').length > 1) {
			przerysujWycieczke();
		} else {
			wyczyscTraseZMapy();
		}
	});


    $('#zapiszWycieczke').click(function () {
		if($('#edycjaWycieczki li').length < 1) {
			alert('Dodaj przynajmmniej jeden punkt trasy.');
			return;
		}
        var timeStampObecnieEdytowanejWycieczki = $('#edycjaWycieczki').attr('data-id');//odczyt atrybutu data-id z elementu edycji wycieczki. Jezeli pusty to znaczy, ze zapisujemy nowa wycieczke. Jezeli jest liczba (timeStamp) znaczy, ze zapisujemy edytowaną(istniejaca wczesniej) wycieczkę
		var wycieczkaDoZapisania = $('#edycjaWycieczki').clone(); //
		if(timeStampObecnieEdytowanejWycieczki) {
			var timeStamp = timeStampObecnieEdytowanejWycieczki;
		} else {
			var timeStamp = '' + Date.now(); //biorę liczbę (obecny timeStamp) i zamieniam (dodając) do stringa
			wycieczkaDoZapisania.attr('data-id', timeStamp);
		}
		wycieczkaDoZapisania.removeAttr('id');
		$('#zapisaneWycieczki').append('<li data-id="' + timeStamp + '"> \
				<div> \
				<button class="btn btn-primary btn-edytuj "> \
				EDYTUJ \
				</button> \
				<button class="btn btn-primary btn-usun "> \
				USUŃ \
				</button> \
				</div> \
				</li>');
		$('#zapisaneWycieczki li:last').prepend(wycieczkaDoZapisania);//dodaje wycieczke przed przyciskami w ostatnio dodanym li

		// console.log(timeStamp);
		window.localStorage.setItem(timeStamp, wycieczkaDoZapisania.html());

		$('#edycjaWycieczki').empty().removeAttr('data-id');
		
		wyczyscTraseZMapy();
    });
	
    //dlatego dokument bo same buttony po zaladowaniu strony mogą jeszcze nie istnieć
    $(document).on('click', '.btn-usun', function () {
        var wycieczkaDoUsuniecia = $(this).closest('li');
        var timeStamp = wycieczkaDoUsuniecia.attr('data-id');
        wycieczkaDoUsuniecia.remove();
        window.localStorage.removeItem(timeStamp);
    });

    $(document).on('click', '.btn-edytuj', function () {
        var wycieczkaDoEdycji = $(this).closest('li');
        var timeStamp = wycieczkaDoEdycji.attr('data-id');
        var timeStampTegoCoObecnieWEdycji = $('#edycjaWycieczki').attr('data-id'); //wyciagam z pola edycji wycieczki, czy jest tam aktualnie edytowana wycieczka
        if(timeStampTegoCoObecnieWEdycji) {  //jezeli jest to musi wrocic na liste zapisanych wycieczek i to w starej postaci
            // była edytowana poprzednia wycieczka
            //do listy wycieczek dodaje na koncu kolejna pozycje i do niej wrzucam starą wersje wycieczki (wzieta z localStorage)
            $('#zapisaneWycieczki').append('<li data-id="' + timeStampTegoCoObecnieWEdycji + '"> \
            <div> \
            <button class="btn btn-primary btn-edytuj"> \
            EDYTUJ \
            </button> \
            <button class="btn btn-primary btn-usun"> \
            USUŃ \
            </button> \
            </div> \
            </li>');
            $('#zapisaneWycieczki li:last').prepend('<ol data-id="' + timeStampTegoCoObecnieWEdycji + '">' + window.localStorage.getItem(timeStampTegoCoObecnieWEdycji) + '</ol>');
        }
        $('#edycjaWycieczki').empty().append(wycieczkaDoEdycji.find('li')).attr('data-id', timeStamp); //oprozniamy pole edycji wycieczki i wstawiamy ta ktora ma byc teraz edytowana
        wycieczkaDoEdycji.remove(); //..i usuwamy ja z listy wycieczek (z html)
		
		//czysci mape i rysuje obecna wycieczke
		wyczyscTraseZMapy();
		przerysujWycieczke();
    });
});
