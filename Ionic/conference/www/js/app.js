// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.users', {
      url: "/users",
      views: {
          'menuContent': {
              templateUrl: "templates/users.html",
              controller: 'UsersCtrl'
          }
      }
    })

  .state('app.user', {
      url: "/users/:userId",
      views: {
          'menuContent': {
              templateUrl: "templates/user.html",
              controller: 'UserCtrl'
          }
      }
    })

  .state('app.transfer', {
      url: '/transfer',
      views: {
        'menuContent': {
          templateUrl: 'templates/transfer.html'
        }
      }
    })

  .state('app.buycredits', {
      url: '/buycredits',
      views: {
        'menuContent': {
          templateUrl: 'templates/buycredits.html'
        }
      }
    })

  .state('app.transactions', {
      url: "/transactions",
      views: {
          'menuContent': {
              templateUrl: "templates/transactions.html",
              controller: 'TransactionsCtrl'
          }
      }
    })

    .state('app.login', {
      url: "/login",
      views: {
          'menuContent': {
              templateUrl: "templates/login.html",
              controller: 'LoginCtrl'
          }
      }
    })

    .state('app.register', {
      url: "/register",
      views: {
          'menuContent': {
              templateUrl: "templates/register.html",
              controller: 'RegisterCtrl'
          }
      }
    })

    .state('app.index', {
      url: '/index',
      views: {
        'menuContent': {
          templateUrl: 'templates/index.html'
        }
      }
    })

    .state('app.welcome', {
      url: '/welcome',
      views: {
        'menuContent': {
          templateUrl: 'templates/welcome.html'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/index');
});
