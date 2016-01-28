/**
 * Created by lukaszd on 27.01.16.
 */

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

