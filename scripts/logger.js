
/**
 * Created by Gosia on 10.02.16. ;)
 */

window.logger = (function(){
    var key = 'logger';

    return {
        log: function (event) {
            var events = JSON.parse(localStorage.getItem(key)) || [];
            events.push(event);
            localStorage.setItem(key, JSON.stringify(events));
        },

        getLog: function () {
            return JSON.parse(localStorage.getItem(key)) || []
        }
    }
})();

var event1 = {
    label: "Muzeum Narodowe",
    place: "Gdansk"
};



logger.log(event1);


////$(event).on('click',function(){
////
////    logger.log( { label: 'muzuem', place: event1oggerlo.place } );
////});
