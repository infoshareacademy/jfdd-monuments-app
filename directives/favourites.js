/**
 * Created by lukaszd on 10.02.16.
 */

var ourApp = angular.module('Workshop', ['dndLists'])
    .directive('favorites', function () {
        return {
            restrict: 'E',
            templateUrl: 'directives/favorites.html',
            transclude: true,
            scope: {},
            controller: function ($scope) {

                $scope.list = [];


                $scope.updateFavorites = function () {
                    localStorage.setItem(
                        'Ulubione', $scope.models.lists.Ulubione
                    );
                };

                $scope.models = {
                    selected: null,
                    lists: {
                        "Zabytki": [],
                        "Ulubione": []
                    }
                };

                if (localStorage.getItem('Ulubione')) $scope.models.lists.Ulubione = localStorage.getItem('Ulubione').split(',');

                $scope.models.lists.Zabytki = [ 'Bazylika Mariacka', 'Brama Wyżynna', 'Brama Św. Ducha', 'Dom Uphagena', 'Kanał na Stępce', 'Muzeum Narodowe', 'Pomnik Poległych Stoczniowców', 'Ratusz Głównego Miasta', 'Reduta Biskupiej Górki', 'Westerplatte', 'Wyspa Spichrzów'];

                for (var i = 0; i < $scope.models.lists.Zabytki.length; i++) {
                    $scope.models.lists.Ulubione.forEach(function (ul) {
                            if (ul == $scope.models.lists.Zabytki[i]) {
                                $scope.models.lists.Zabytki.splice(i,1);
                            }
                        }
                    )
                }


                // Model to JSON for demo purpose

                //$http.get('').then(function (response) {
                //    $scope.loginData = response.data;
                //});


                //})
            }
        }
    });






