/**
 * Created by lukaszd on 27.01.16.
 */

var MONUMENTS_IDS = {1: 'dworartusa', 2: 'muzeumburszt', 3: 'ratusz'};

$(function () {
    var $jsonFetchingStatusContainer = $('#json-fetching-status');

    $jsonFetchingStatusContainer.text('Fetching...');
    $.ajax({
        url: 'data/dworartusa.json',
        success: function (item) {

			$('.targetForJSON').append(
				$('<h3>' + item.name + '</h3><p>' + item.description + '</p>')
			);

            $jsonFetchingStatusContainer.text('Fetched.');
        }
    });
});

var monuments_ID = marker.addListener('click', function() {



}

function showMonumentDetails(monumentId) {
    $.ajax({
        url: 'data/' + MONUMENTS_IDS[monumentId] + '.json',
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


$("#selectedMonument").on('change', function (event) {

    var selectedMonumentId = $(this).val();
    console.log('New selected monument id: ' + selectedMonumentId);
    showMonumentDetails(selectedMonumentId)
});