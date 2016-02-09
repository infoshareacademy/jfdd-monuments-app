/**
 * Created by lukaszd on 09.02.16.
 */

angular.module("favourites").controller("FavCtrl", function($scope) {

    $scope.models = {
        selected: null,
        lists: {"zabytki": [], "ulubione": []}
    };

    // Generate initial model
    for (var i = 1; i <= 3; ++i) {
        $scope.models.lists.zabytki.push({label: "Item A" + i});
        $scope.models.lists.ulubione.push({label: "Item B" + i});
    }

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

});