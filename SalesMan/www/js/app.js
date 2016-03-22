// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('salesMan', ['ionic', 'ngCordova', 'firebase'])

    .config(function ($stateProvider, $urlRouterProvider) {

      $stateProvider
          .state('oathPage', {
            url: '/oathPage',
            controller: 'oathPageController',
            templateUrl: 'views/oathPage/oathPage.html'
          })
          .state('orderPage', {
            url: '/orderPage',
            controller: 'orderPageController',
            templateUrl: 'views/orderPage/orderPage.html'
          })
          .state('orderEntry', {
              url: '/orderEntry/:prodName',
              controller: 'orderEntryController',
              templateUrl: 'views/orderEntry/orderEntry.html'
          });

      $urlRouterProvider
          .otherwise('/oathPage');
    })


   /* .factory("orders", function($firebaseArray, $rootScope) {
        alert("hello");
        var ordersRef = new Firebase("https://intense-inferno-4383.firebaseio.com/Orders").child($rootScope.salesManData.CompanyOwnerUID);
        return $firebaseArray(ordersRef);
    })*/






.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
