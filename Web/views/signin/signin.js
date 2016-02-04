angular.module('salesMan')
    .controller('signinController', function ($rootScope, $scope, $http, $state) {
    $scope.userDetails = [];
    $scope.signIn = function () {
        $http.post("/signIn", $scope.userData)
            .then(function (success) {
            // console.log(success);
            var userData = success;
            $http.post('/checkCoExist', userData)
                .then(function (successsec) {
                //   console.log(successsec);
                if (successsec.data == false) {
                    $rootScope.userData = success;
                    $state.go("home");
                }
                else {
                    $rootScope.userData = success;
                    $rootScope.companyData = successsec;
                    $state.go("companyprofile");
                }
                // $rootScope.userData = success;
                // $state.go("home");
            }, function (err) {
                console.log("failed To Send" + err);
            });
        }, function (err) {
            console.log("failed To Send" + err);
        });
    };
});
