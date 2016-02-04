angular.module('salesMan')
    .controller('companyprofileController', function ($rootScope, $scope, $http, $state) {
    $scope.coData = {};
    //  console.log($rootScope.companyData.data)
    var coData = $rootScope.companyData;
    $http.post("/getSalesman", coData)
        .then(function (success) {
        console.log(success);
        $scope.salesMan = success.data;
    }, function (err) {
        console.log(err);
    });
    $scope.companyData = $rootScope.companyData.data;
    $scope.createProduct = function () {
        $state.go("creatProduct");
    };
    $scope.createSalesman = function () {
        $state.go("creatSalesMan");
    };
});
