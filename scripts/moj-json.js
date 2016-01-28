/**
 * Created by lukaszd on 27.01.16.
 */

const MONUMENTS_IDS = {1 : 'dworartusa', 2:'muzeumburszt', 3: 'ratusz'};

    $(function () {
        var $jsonFetchingStatusContainer = $('#json-fetching-status');

        $jsonFetchingStatusContainer.text('Fetching...');
        $.ajax({
            url: 'data/dworartusa.json',
            success: function (item) {

                $('.targetForJSON').append(
                    $('<h3>' + item.name + '<small>' + item.description + '</small></h3>')
                );

                $jsonFetchingStatusContainer.text('Fetched.');
            }
        });
    });

function showMonumentDetails(monumentId) {
    $.ajax({
        url: 'data/'+MONUMENTS_IDS[monumentId]+'.json',
        success: function (item) {

            $('.targetForJSON').html(
                $('<h3>' + item.name + '<small>' + item.description + '</small></h3>')
            );

        }
    });

}


$("#selectedMonument").on('change', function(event) {
    var selectedMonumentId = $('#selectedMonument').val();
    console.log('New selected monument id: ' + selectedMonumentId);
    showMonumentDetails(selectedMonumentId)
});