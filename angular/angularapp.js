(function(){
    var app = angular.module('zabytki', []);

    app.controller('zabytkiCtrl', function ($scope, $http) {
        $scope.sites = [
            {name: 'Glowna', href: '#dogory'},
            {name: 'Mapa', href: '#domapy'},
            {name: 'Zaplanuj wycieczkę', href: '#zaplanujwycieczke'},
            {name: 'Zabytki z wpisem do rej.', href: '#zabytkizwpisemdorej'}
        ];
        $scope.selectMonument = selectMonument;

        function selectMonument(monument) {
            $scope.monument = monument;
        }

        $http.get('../data/zabytki.json').then(function (response) {
            $scope.monuments = response.data;
            $scope.monument = response.data[0];
        });

    });
})();