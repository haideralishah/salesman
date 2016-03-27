/**
 * Created by haider on 3/21/2016.
 */

angular.module('salesMan')
    .controller("orderEntryController", function($rootScope, $scope, $http, $state, $cordovaGeolocation, $stateParams, $firebaseArray) {


        $scope.orderDetails = {};

        $scope.addItem = function(val) {
            val.$add($scope.orderDetails);

        };

        //$scope.orders = orders;

        $scope.enterOrder = function () {
            console.log($rootScope.salesManData.CompanyOwnerUID);
            var ordersRef = new Firebase("https://intense-inferno-4383.firebaseio.com/Orders").child($rootScope.salesManData.data.CompanyOwnerUID);

            var firebaseArr = $firebaseArray(ordersRef);

            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                    var lat  = position.coords.latitude;
                    var long = position.coords.longitude;
                    console.log(lat);

                    $scope.orderDetails.lat = lat;
                    $scope.orderDetails.long = long;
                    //console.log($stateParams.prodPrice);
                    $scope.orderDetails.ProductPrice = $stateParams.prodPrice;
                    $scope.orderDetails.ProductName = $stateParams.prodName;

                    $scope.addItem(firebaseArr);


                    $scope.orderDetails = {};

                    $state.go("orderPage");


                }, function(err) {
                    // error
                });

        };




    });

