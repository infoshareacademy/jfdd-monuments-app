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
                    $('<li>' + item.name + ' <small>' + item.description + '</small></li>')
                );

                $jsonFetchingStatusContainer.text('Fetched.');
            }
        });
    });

//
//.map(function (item) {
//    var liNode = $('<li>');
//    var linkNode = $('<a>');
//    var smallNode = $('<small>').css({ display: 'block', fontStyle: 'italic' });
//    var guidNode = $('<a>');
//
//    // <small> tag creation
//    smallNode.text(item.pubDate);
//
//    // <li> tag creation
//    linkNode.attr('href', item.link);
//    linkNode.text(item.title);
//
//    guidNode.attr('href', item.guid);
//    guidNode.text(item.guid);
//
//    liNode
//        .append(linkNode, smallNode, guidNode, '<br>', '<br>');
//
//    return liNode;
//});