/**
 * Created by lukaszd on 10.02.16.
 */

angular.module('Workshop', ['dndLists'])
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
                        'ulubione', $scope.models.lists.ulubione
                    );
                };

                $scope.models = {
                    selected: null,
                    lists: {
                        "zabytki": [],
                        "ulubione": []
                    }
                };

                if (localStorage.getItem('ulubione')) $scope.models.lists.ulubione = localStorage.getItem('ulubione').split(',');

                $scope.models.lists.zabytki = ['wybierz-zabytek', 'bazylika', 'brama-wyzynna', 'brama-ducha', 'dom-uphagena', 'kanal', 'muzeum-narodowe', 'stoczniowcy', 'ratusz', 'reduta', 'westerplatte', 'wyspa'];

                for (var i = 0; i < $scope.models.lists.zabytki.length; i++) {
                    $scope.models.lists.ulubione.forEach(function (ul) {
                            if (ul == $scope.models.lists.zabytki[i]) {
                                $scope.models.lists.zabytki.splice(i,1);
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






