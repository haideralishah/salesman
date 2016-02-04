angular.module('salesMan')

  .controller('homeController', ($rootScope, $scope, $http, $state)=>{
      
      
   
 //      $scope.coData.UID = $rootScope.users;
      
       console.log($rootScope.userData.data._id);
       $scope.coData = {};
       $scope.coData.comOwnUID = $rootScope.userData.data._id;
       
       $scope.createComp = function () {
         //  console.log($scope.coData);
           
            $http.post("/createCompany", $scope.coData)
             .then(function(success){
          
                
//          $rootScope.uID = success._id;
                 
            $state.go("companyprofile");
                
               
                
                 },
               function(err){
               console.log("failed To Send" + err)
             });   
           
           
           
       }    
      
      
  }

