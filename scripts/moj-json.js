/**
 * Created by lukaszd on 27.01.16.
 */

var Monuments_Ids = {666: 'wybierz-zabytek', 0: 'bazylika', 1: 'brama-ducha', 5: 'fontanna', 9: 'ratusz'};

$(function () {
    var $jsonButtonContainer = $('#json-fetching-status');

    $jsonButtonContainer.text('Fetching...');
    $.ajax({
        url: 'data/wybierz-zabytek.json',
        success: function (item) {

            $('.targetForJSON').append(
                $('<h3>' + item.name + '</h3><p>' + item.description + '</p>')
            );

            $jsonButtonContainer.text('Fetched.');
        }
    });
});

$("#selectedMonument").on('change', function (event) {

    var selectedMonumentId = $(this).val();
    console.log('New selected monument id: ' + selectedMonumentId);
    showMonumentDetails(selectedMonumentId)
});

function showMonumentDetails(monumentId) {
    $.ajax({
        url: 'data/' + Monuments_Ids[monumentId] + '.json',
        success: function (item) {
            $('.targetForJSON').html(
                $('<h3>' + item.name + '</h3><p>' + item.description + '</p>')
            );
        },
		error: function(err, std) {
            console.debug('ERROR', err, std);
        }
    });
}


