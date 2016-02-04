angular.module('salesMan')
    .controller('signupController', function ($scope, $http) {
    $scope.userDetails = [];
    $scope.addUserData = function () {
        // $scope.userDetails.push($scope.userData);
        // console.log($scope.userDetails);
        $http.post("/signup", $scope.userData)
            .then(function (success) {
            console.log("suceeded");
            console.log(success);
        }, function (err) {
            console.log("failed To Send" + err);
        });
    };
});
