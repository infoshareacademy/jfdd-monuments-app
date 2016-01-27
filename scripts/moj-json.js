/**
 * Created by lukaszd on 27.01.16.
 */

var $jsonFetchingStatusContainer = $('#json-fetching-status');

$jsonFetchingStatusContainer.text('Fetching...');
$.ajax({
    url: 'data/',
    data: {},
    dataType: 'jsonp',
    jsonp: 'callback',
    success: function (response) {
        $('#json-feed').append(process(response).
        map(function (item) {
            return $('<li>' + item.title + ' <small>' + item.pubDate + '</small></li>');
        }));

        $jsonFetchingStatusContainer.text('Fetched.');
    }
});