angular.module('salesMan')
    .controller('creatProductController', function ($rootScope, $scope, $http, $state) {
    $scope.addProduct = function () {
        //console.log($rootScope.userData);
        $scope.Product.companyProfID = $rootScope.companyData.data._id;
        $scope.Product.CompanyOwnerUID = $rootScope.userData.data._id;
        $http.post("/createProduct", $scope.Product)
            .then(function (success) {
            console.log(success);
            $state.go("companyprofile");
        }, function (err) {
            console.log(err);
        });
    };
});
