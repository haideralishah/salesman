angular.module('salesMan')
    .controller('companyprofileController', function ($timeout, $rootScope, $scope, $http, $state, $firebaseArray) {
    //console.log($rootScope.userData._id);
    var token = localStorage.getItem("token");
    var ordersRef = new Firebase("https://intense-inferno-4383.firebaseio.com/Orders").child(token);
    $rootScope.firebaseArr = $firebaseArray(ordersRef);
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
    $http.post("/prodSearch", coData)
        .then(function (successForProd) {
        // console.log($rootScope.companyData.data.CompanyOwnerUID);
        console.log(successForProd);
        $scope.product = successForProd.data;
        console.log($scope.salesMan);
    }, function (err) {
        console.log(err);
    });
    $http.post("/orderSearch", coData)
        .then(function (successForProd) {
        // console.log($rootScope.companyData.data.CompanyOwnerUID);
        console.log(successForProd);
        $scope.orders = successForProd.data;
        console.log($scope.orders);
    }, function (err) {
        console.log(err);
    });
    $scope.saveToRootaa = function (val) {
        $rootScope.orderDetails = val;
    };
    $scope.saveToRoot = function (val) {
        val.CompanyOwnerUID = coData.data.CompanyOwnerUID;
        $rootScope.orderDetails = val;
        console.log(val);
        $http.post("/addProd", val)
            .then(function (prodAdded) {
            console.log(val.$id);
            $scope.tempOrder = val;
            var remId = $rootScope.firebaseArr.$getRecord(val.$id);
            $rootScope.firebaseArr.$remove(remId);
            $state.go("orderDetails");
        }, function (err) {
            console.log(err);
        });
    };
    $scope.companyData = $rootScope.companyData.data;
    $scope.createProduct = function () {
        $state.go("creatProduct");
    };
    $scope.createSalesman = function () {
        $state.go("creatSalesMan");
    };
    $scope.seeOrders = function () {
        $state.go("orderName");
    };
});
