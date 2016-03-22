angular.module('salesMan')
    .controller('orderNameController', function ($rootScope, $scope) {
    $scope.saveToRoot = function (val) {
        $rootScope.orderDetails = val;
    };
    console.log($rootScope.firebaseArr);
});
