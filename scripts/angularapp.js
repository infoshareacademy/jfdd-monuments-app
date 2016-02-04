/**
 * Created by snikers on 03.02.16.
 */

(function(){
    var app = angular.module('zabytki', []);

    app.controller('zabytkiCtrl', function ($scope, $http) {
        $scope.sites = [
            {name: 'Glowna', href: '#dogory'},
            {name: 'Mapa', href: '#domapy'},
            {name: 'Zaplanuj wycieczkę', href: '#zaplanujwycieczke'},
            {name: 'Zabytki z wpisem do rej.', href: '#zabytkizwpisemdorej'}
        ];

        $http.get('../data/zabytki.json').then(function (response) {
            $scope.monuments = response.data
        });

    }).controller('', function ($scope) {
        $scope.zabytkiCtrl = zabytkiCtrl;
    });
})();