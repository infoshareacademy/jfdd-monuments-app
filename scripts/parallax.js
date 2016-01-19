/**
 * Created by gosia on 07.01.16.
 */

$(document).ready(function(){
    var elementZTlem = $('.header');//zapisanie w zmiennej elementu z domku
    $(window).on("load scroll",//dodanie listenera na event load i scroll - na jaki event czyli ON
        function() {
            var aktualnyScrollOkna = $(window).scrollTop();//zwraca przesuniecie okna po scrollu
            var wektorZmianyTla = aktualnyScrollOkna *(0.8) ;//wyliczanie wektora zmiany
            elementZTlem.css('background-position-y', wektorZmianyTla - 300);// 200 to poczatkowe przesuniecie tla, zwraca wartosc w/w linijka
        }
    )

});


