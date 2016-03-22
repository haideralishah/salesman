angular.module('salesMan')

  .controller('companyprofileController', ($timeout, $rootScope, $scope, $http, $state, $firebaseArray)=>{


      console.log($rootScope.userData._id);
      var token = localStorage.getItem("token");
      var ordersRef = new Firebase("https://intense-inferno-4383.firebaseio.com/Orders").child(token);

      $rootScope.firebaseArr = $firebaseArray(ordersRef);



                 /* $scope.$watch($scope.firebaseArr, function(){
                     // alert("haidder");
                     // console.log($scope.firebaseArr)
                  });*/



      $scope.coData = {};
      
    //  console.log($rootScope.companyData.data)
      var coData = $rootScope.companyData;
      
      $http.post("/getSalesman", coData)
              .then(function(success) {
                  console.log(success); 
                  $scope.salesMan = success.data;              
              },
              function(err) {
                  console.log(err)
              });
      
      
      
      $scope.companyData = $rootScope.companyData.data;
      $scope.createProduct = function() {

          $state.go("creatProduct");
          
      };
      $scope.createSalesman = function() {
          
          $state.go("creatSalesMan");

      };

      $scope.seeOrders = function() {

          $state.go("orderName");

      };




  });

