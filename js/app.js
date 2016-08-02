var admin = angular.module('admin', ['ui.router', 'ngMaterial', 'ngMessages']);
var config = {
    apiKey: "AIzaSyD3GO4-9oSqSxrhhF-Zcq7FZYdEFsWOGmw",
    authDomain: "temp-df1a5.firebaseapp.com",
    databaseURL: "https://temp-df1a5.firebaseio.com",
    storageBucket: "temp-df1a5.appspot.com",
  };
firebase.initializeApp(config);
var database = firebase.database();

/* Angular UI Router */
admin.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('/basic', {
      url: '/basic',
      views: {
        'main-view': {
          templateUrl: 'templates/basic.html',
          controller: 'adminCtrl'
        }
      }
    })
    .state('/services', {
      url: '/services',
      views: {
        'main-view': {
          templateUrl: 'templates/services.html',
          controller: 'serviceCtrl'
        }
      }
    })
    ;
  $urlRouterProvider.otherwise('/basic');
});



  