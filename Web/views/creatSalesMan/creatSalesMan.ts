angular.module('salesMan')

  .controller('creatSalesManController', ($rootScope, $scope, $http, $state)=>{


      $scope.addSalesman = function() {
          
         $scope.Salesman.companyProfID = $rootScope.companyData.data._id;
          $scope.Salesman.CompanyOwnerUID = $rootScope.userData.data._id;
          $http.post("/createSalesman", $scope.Salesman)
              .then(function(success) {


                  console.log(success);
                  $state.go("companyprofile");



              },
              function(err) {
                  console.log(err)
              });



      }    

      
  }

