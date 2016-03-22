let app = angular.module("salesMan", ['ui.router', "ngMaterial", "firebase"]);
	
app.config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('signup', {
        url: '/signup',       
		controller: 'signupController',
        templateUrl: 'views/signup/signup.html'
      })
	  .state('signin', {
        url: '/signin',       
		controller: 'signinController', 
        templateUrl: 'views/signin/signin.html'
      })
      .state('home', {
          url: '/home',
          controller: 'homeController',
          templateUrl: 'views/home/home.html'
      })
      .state('companyprofile', {
          url: '/companyprofile',
          controller: 'companyprofileController',
          templateUrl: 'views/companyprofile/companyprofile.html'
      })
        .state('creatSalesMan', {
          url: '/creatSalesMan',
          controller: 'creatSalesManController',
          templateUrl: 'views/creatSalesMan/creatSalesMan.html'
      })
      .state('creatProduct', {
          url: '/creatProduct',
          controller: 'creatProductController',
          templateUrl: 'views/creatProduct/creatProduct.html'
      })
      .state('orderDetails', {
          url: '/orderDetails',
          controller: 'orderDetailsController',
          templateUrl: 'views/orderDetails/orderDetails.html'
      })
        .state('orderName', {
          url: '/orderName',
          controller: 'orderNameController',
          templateUrl: 'views/orderName/orderName.html'
      });
    

    $urlRouterProvider
       .otherwise('/signin');
  });

	


