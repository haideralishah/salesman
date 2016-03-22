/**
 * Created by haider on 2/25/2016.
 */

angular.module('salesMan')
    .controller("oathPageController", function($scope, $http, $state, $rootScope){
        $scope.salesman = {};
        $scope.signInSalesman = function (salesman){
         //   console.log(salesman);
            $http.post("http://localhost:3001/salesManSignIn", salesman)
                .then(function(success){

                        if(success.data == false){
                            $scope.userData = success;
                            $state.go("oathPage");
                        }
                        else{
                            console.log(success);
                            $rootScope.salesManData = success;
                            $state.go("orderPage");
                        }

                    },
                    function(err){
                        console.log("failed To Send salesman Login" + err)
                    });

        }

    });
