/**
 * Created by gosia on 21.01.16.
 */
function pobierzDaneJson() {
    $.ajax({
        url: 'data/monuments.json',
        //dataType: 'jsonp',
        success: function (response) {
            var kontener = $('map');
            response.forEach(function (monument) {


            });
        }
    });

}