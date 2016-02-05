/**
 * Created by lukaszd on 03.02.16.
 */

angular.module("monumentsDrag").controller("Ctrl", function($scope) {

    $scope.models = {
        selected: null,
        lists: {"Zabytki do wyboru": [], "Ulubione": []}
    };

    // Generate initial model
    for (var i = 1; i <= 3; ++i) {
        $scope.models.lists.A.push({label: "Item A" + i});
        $scope.models.lists.B.push({label: "Item B" + i});
    }

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

});