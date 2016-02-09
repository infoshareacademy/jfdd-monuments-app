/**
 * Created by Belion on 2016-02-09.
 */

$(function() {
    $( "#edycjaWycieczki" ).sortable();
    $( "#edycjaWycieczki" ).disableSelection();


    $(document).on('click', '.dodajDoWycieczki', function(){
        var nazwaZabytku = $(this).parent().text();
        var idZabytku = $(this).closest('tr').attr('id');
        var nowyPunktWycieczki = '<li data-id="' + idZabytku + '">' + nazwaZabytku + '</li>';
        console.log(nazwaZabytku, idZabytku, nowyPunktWycieczki);
        $('#edycjaWycieczki').append(nowyPunktWycieczki);
    });
});