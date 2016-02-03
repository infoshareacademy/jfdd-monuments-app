/**
 * Created by snikers on 03.02.16.
 */

(function(){
    var app = angular.module('zabytki', []);

    app.controller('zabytkiCtrl', function ($scope, $http) {
        $scope.sites = [
            {name: 'Glowna', href: '#dogory'},
            {name: 'Mapa', href: '#domapy'},
            {name: 'Zabytki', href: '#dozabytki'},
            {name: 'Footer', href: '#dofootera'}
        ];

        $http.get('../data/zabytki.json').then(function (response) {
            $scope.monuments = response.data
        });

    }).controller('', function ($scope) {
        $scope.zabytkiCtrl = zabytkiCtrl;
    });
})();