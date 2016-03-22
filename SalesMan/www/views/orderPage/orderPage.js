/**
 * Created by haider on 3/2/2016.
 */
angular.module('salesMan')
    .controller("orderPageController", function($rootScope, $scope, $http, $state) {

            $scope.coData = {};
            //  console.log($rootScope.companyData.data)
            var coData = $rootScope.salesManData;
            console.log(coData);
            $http.post("http://localhost:3001/productSearch", coData)
                .then(function(success) {
                    console.log(success);

                        $scope.Products = success.data;

                    },
                    function(err) {
                        console.log(err);
                    });




        });