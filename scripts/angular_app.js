//(function(){
//    var app = angular.module('Workshop', []);
//
//    app.controller('BaseController', function () {
//
//    });
//})();




angular.module('Workshop')
    .directive('Workshop', function () {
        return {
            restrict: 'EAC',
            templateUrl: 'index_LS.html',
            transclude: true,
            scope: {},
            controller: function ($scope, $http) {
                $http.get('http://www.wp.pl').then(function (response) {
                    $scope.loginData = response.data;
                });
            }
        }
    });