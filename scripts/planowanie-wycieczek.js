/**
 * Created by Belion on 2016-02-09.
 */

$(function () {
    $("#edycjaWycieczki").sortable();
    $("#edycjaWycieczki").disableSelection();

    for(var timeStamp in window.localStorage) {
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

    $(document).on('click', '.dodajDoWycieczki', function () {
        var nazwaZabytku = $(this).parent().text();
        var idZabytku = $(this).closest('tr').attr('id');
        var nowyPunktWycieczki = '<li data-id="' + idZabytku + '">' + nazwaZabytku + '</li>';
        console.log(nazwaZabytku, idZabytku, nowyPunktWycieczki);
        $('#edycjaWycieczki').append(nowyPunktWycieczki);
    });

    $('#zapiszWycieczke').click(function () {
        var wycieczkaDoZapisania = $('#edycjaWycieczki').clone();
        var timeStamp = '' + Date.now(); //biorę liczbę (obecny timeStamp) i zamieniam (dodając) do stringa
        wycieczkaDoZapisania.removeAttr('id').attr('data-id', timeStamp);
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

        $('#edycjaWycieczki').empty();
    });

    $(document).on('click', '.btn-usun', function () {
        var wycieczkaDoUsuniecia = $(this).closest('li');
        var timeStamp = wycieczkaDoUsuniecia.attr('data-id');
        wycieczkaDoUsuniecia.remove();
        window.localStorage.removeItem(timeStamp);
    });
});
