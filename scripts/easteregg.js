$(document).ready(function() {
    $('.easter__close').click(function() {
        $('.easter').fadeOut(500);
        $('.overlay').fadeOut(500);
		// Dla wszystkich elementów em wewnątrz spanów wszystkich poza rekordem, wewnątrz okna gry - wstawiamy wartość ..
		// zero, w celu resetu licznika
        $('.easter span:not(.easter__counters__highscore) em').text('0');
		//Usuniecie symboli-ikonek zabytków na mapie oraz okienka gameover
		$('.easter__map .symbol-zabytku, .easter__gameover').remove();
		
    });

	function klikNaZabytku() {
		//klikniecie symbol-zabytku, przyjmujemy odleglosc zero dla przypadku 1szego klikniecia oraz obliczamy odleglosc miedzy poprzednio a aktualnie
		//kliknietym obiektem
		var mapWidth = $('.easter__map').width();
		var mapHeight = $('.easter__map').height();
		var c = document.getElementById("EasterLines");
		var ctx = c.getContext("2d");

		if (!$(this).hasClass('klikniety')) {
			var monumentsCounter = $('.easter__counters__monuments em');
			var odlegloscXY = 0;
			var poprzednioKlikniety = $('.symbol-zabytku[data-klikniety-jako="' + monumentsCounter.text() + '"]');

			if(poprzednioKlikniety.length) {
				var odlegloscNaOsiX = Math.abs($(this).attr('data-x') - poprzednioKlikniety.attr('data-x')) * mapWidth / 100;
				var odlegloscNaOsiY = Math.abs($(this).attr('data-y') - poprzednioKlikniety.attr('data-y')) * mapHeight / 100;
				odlegloscXY = Math.sqrt(odlegloscNaOsiX * odlegloscNaOsiX + odlegloscNaOsiY * odlegloscNaOsiY);
			}

			//aktualną odległość wstawiamy do licznika przebytej drogi
			var nowaOdleglosc = Math.round(parseInt($('.easter__counters__route em').text()) + odlegloscXY);
			var limitOdleglosci = parseInt($('.easter__counters__limit em').text());

			//porownujemy przebytą drogę do limitu odległości, przy spełnieniu warunku zwiekszamy licznik odwiedzonych zabytków
			if(nowaOdleglosc <= limitOdleglosci) {
				$('.easter__counters__route em').text(nowaOdleglosc);
				monumentsCounter.text(parseInt(monumentsCounter.text()) + 1);
				$(this).addClass('klikniety').attr('data-klikniety-jako', monumentsCounter.text());

				//pobieramy dane odn lokalizacj zabytków: poprzedniego i aktualnie klikniętego i łączymy zabytki linią
				//przeliczamy x,y z procentów na piksele, okreslamy grubość linii(4) i rysujemy(stroke)
				ctx.beginPath();
				ctx.moveTo(poprzednioKlikniety.attr('data-x') * mapWidth / 100, poprzednioKlikniety.attr('data-y') * mapHeight / 100);
				ctx.lineTo($(this).attr('data-x') * mapWidth / 100, $(this).attr('data-y') * mapHeight / 100);
				ctx.lineWidth = 4;
				ctx.strokeStyle = '#cc2222';
				ctx.stroke();

				// Wybieramy wszystkie symbole zabytków które nie mają jeszcze atrybutu "klikniety jako"...
				if($('.symbol-zabytku:not([data-klikniety-jako])').length == 0) {
					$('.easter__map').append('<div class="easter__gameover">WYGRAŁEŚ - GRATULUJEMY!<br>Odkryłeś wszystkie zabytki! </div>');
					$('.symbol-zabytku').off('click');

					//jezeli zamieniona na liczbe zawartość elementu: licznik zabytków jest wieksza od dotychczasowego rekordu to podmieniamy dotychczasowy rekord na wlasnie uzyskany.
					if (parseInt($('.easter__counters__monuments em').text() )> parseInt($('.easter__counters__highscore em').text() )) {
						$('.easter__counters__highscore em').text($('.easter__counters__monuments em').text());

						// cookie odn.ustanowienia rekordu
						document.cookie = 'rekordWGrze=' + $('.easter__counters__highscore em').text();
					}
				}


			} else {
				// game over
				$('.easter__map').append('<div class="easter__gameover">KONIEC GRY<br>Wyczerpałeś swój limit! </div>');
				$('.symbol-zabytku').off('click');

				//jezeli zamieniona na liczbe zawartość elementu: licznik zabytków jest wieksza od dotychczasowego rekordu to podmieniamy dotychczasowy rekord na wlasnie uzyskany.
				if (parseInt($('.easter__counters__monuments em').text() )> parseInt($('.easter__counters__highscore em').text() )) {
					$('.easter__counters__highscore em').text($('.easter__counters__monuments em').text());

					// cookie odn.ustanowienia rekordu
					document.cookie = 'rekordWGrze=' + $('.easter__counters__highscore em').text();

				}
			}
		}
	}

	/* obsługa wyłączenia okienka eastern__welcome;*/
	$('#EasterWelcome a').click(function() {
		$('#EasterWelcome').remove();

		$('.symbol-zabytku').click(klikNaZabytku);
	});
	
	//wywołanie eastera
    $('.wywolanie__easteregg').click(function() {
        $('.easter').fadeIn(500);
        $('.overlay').fadeIn(500);

		//odczyt ciasteczka z dotychczasowym rekordem (cyfry 0-9, powtorzone przynajniej raz (wyrazenia regularne)
		var ciastko = document.cookie.match('rekordWGrze\=([0-9]+)');
		if(ciastko) {
			$('.easter__counters__highscore em').text(ciastko[1]);
		}

		//szerokosc i wysokosc mapy, okreslenie limitu odkleglosci - proporcjonalnego dla wielkosci mapy !
        var mapWidth = $('.easter__map').width();
        var mapHeight = $('.easter__map').height();
        var routeLimit = mapHeight + mapWidth;
        routeLimit = Math.round(routeLimit);
		//znajdujemy route limit i wstawiamy okreslony limit w odpowiednie miejsce
        $('.easter__counters__limit em').text(routeLimit);

		//obsluga elementu canvas i nadanie jemu parametrów wymiarów
		var c = document.getElementById("EasterLines");
		var ctx = c.getContext("2d");
		ctx.canvas.width = mapWidth;
		ctx.canvas.height = mapHeight;
		
		//generowanie zabytków i ich położenia - wykorzystujemy 90% mapy + 5 % przesuniecja od lewej (czyli zakres od 5 do 95% x,y mapy)
		var x, y;
		for (var i=0 ; i <15 ; i++) {
			x = Math.round(Math.random() * 90) + 5;
			y = Math.round(Math.random() * 90) + 5;
			$('.easter__map').append('<div class="symbol-zabytku" data-x="' + x + '" data-y="' + y + '" data-number="' + i + '" style="left:' + x + '%; top:' + y + '%;"></div>');
		}

		if ($('#EasterWelcome').length === 0) {
			$('.symbol-zabytku').click(klikNaZabytku);
		}
	});

	//resizing mapy "na bieżąco", przeliczanie limitu odległości, przebytej dotychczas drogi
    $( window ).resize(function() {
        if ($('.easter').is(":visible")) {
			// przeliczanie limitu odległości
            var mapWidth = $('.easter__map').width();
            var mapHeight = $('.easter__map').height();
            var routeLimit = mapHeight + mapWidth;
			routeLimit = Math.round(routeLimit);
            $('.easter__counters__limit em').text(routeLimit);

			// przeliczanie łącznej odległości
			var totalRouteAfterResize = 0;
			var zabytekPoczatkowy,
				zabytekKoncowy;
			var odlegloscNaOsiX,
				odlegloscNaOsiY,
				odlegloscXY;
			for (var i=1 ; i <15 ; i++) {
				zabytekPoczatkowy = $('.symbol-zabytku[data-klikniety-jako="' + i +'"]');
				zabytekKoncowy = $('.symbol-zabytku[data-klikniety-jako="' + (i + 1) + '"]');
				if(zabytekPoczatkowy.length && zabytekKoncowy.length) {
					odlegloscNaOsiX = Math.abs(zabytekPoczatkowy.attr('data-x') - zabytekKoncowy.attr('data-x')) * mapWidth / 100;
					odlegloscNaOsiY = Math.abs(zabytekPoczatkowy.attr('data-y') - zabytekKoncowy.attr('data-y')) * mapHeight / 100;	
					odlegloscXY = Math.sqrt(odlegloscNaOsiX * odlegloscNaOsiX + odlegloscNaOsiY * odlegloscNaOsiY);
					totalRouteAfterResize = totalRouteAfterResize + odlegloscXY;
				} else {
					break;
				}
			
			}
			$('.easter__counters__route em').text(Math.round(totalRouteAfterResize));
        }
    });
			
});	