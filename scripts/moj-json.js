/**
 * Created by lukaszd on 27.01.16.
 */

var MONUMENTS_IDS = {1: 'dworartusa', 2: 'muzeumburszt', 9: 'ratusz'};

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


