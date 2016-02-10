/**
 * Created by Belion on 2016-02-09.
 */

$(function () {
    $("#edycjaWycieczki").sortable();
    $("#edycjaWycieczki").disableSelection();

    for(var timeStamp in window.localStorage) { //wypisywanie listy istniejacych wycieczek
        if(timeStamp.match('^[0-9]{13}$')) {
            $('#zapisaneWycieczki').append('<li data-id="' + timeStamp + '"> \
                <div> \
                <button class="btn btn-edytuj"> \
                EDYTUJ \
                </button> \
                <button class="btn btn-usun"> \
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
        var nowyPunktWycieczki = '<li data-id="' + idZabytku + '">' + nazwaZabytku + '</li>';
        console.log(nazwaZabytku, idZabytku, nowyPunktWycieczki);
        $('#edycjaWycieczki').append(nowyPunktWycieczki);
    });

    $('#zapiszWycieczke').click(function () {
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
                <button class="btn btn-edytuj"> \
                EDYTUJ \
                </button> \
                <button class="btn btn-usun"> \
                USUŃ \
                </button> \
                </div> \
                </li>');
        $('#zapisaneWycieczki li:last').prepend(wycieczkaDoZapisania);//dodaje wycieczke przed przyciskami w ostatnio dodanym li

        console.log(timeStamp);
        window.localStorage.setItem(timeStamp, wycieczkaDoZapisania.html());

        $('#edycjaWycieczki').empty().removeAttr('data-id');
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
            <button class="btn btn-edytuj"> \
            EDYTUJ \
            </button> \
            <button class="btn btn-usun"> \
            USUŃ \
            </button> \
            </div> \
            </li>');
            $('#zapisaneWycieczki li:last').prepend('<ol data-id="' + timeStampTegoCoObecnieWEdycji + '">' + window.localStorage.getItem(timeStampTegoCoObecnieWEdycji) + '</ol>');
        }
        $('#edycjaWycieczki').empty().append(wycieczkaDoEdycji.find('li')).attr('data-id', timeStamp); //oprozniamy pole edycji wycieczki i wstawiamy ta ktora ma byc teraz edytowana
        wycieczkaDoEdycji.remove(); //..i usuwamy ja z listy wycieczek (z html)
    });
});
