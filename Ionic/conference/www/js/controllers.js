angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $window) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.saldoData = {};
  $scope.transferData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

        // Posting data to php file
        $http({
          method  : 'POST',
          url     : 'http://localhost:8000/postuser/',
          data    : $scope.loginData, //forms user object
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
         })
          .success(function(data) {
            console.log('SUCCESS');
            $window.location.reload();
            if (data.errors) {
              // Showing errors.
              $scope.errorName = data.errors.name;
              $scope.errorUserName = data.errors.username;
              $scope.errorEmail = data.errors.email;
            } else {
              $scope.message = data.message;
            }
          });

  };

  // Recargar saldo
  $scope.recargarSaldo = function() {
    console.log('recargando saldo', $scope.saldoData);

        // Posting data to php file
        $http({
          method  : 'PUT',
          url     : 'http://localhost:8000/updateuser/'+$scope.saldoData['username'],
          data    : $scope.saldoData, //forms user object
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
         })
          .success(function(data) {
            console.log('SUCCESS');
            $window.location.reload();
            if (data.errors) {
              // Showing errors.
              $scope.errorName = data.errors.name;
              $scope.errorUserName = data.errors.username;
              $scope.errorEmail = data.errors.email;
            } else {
              $scope.message = data.message;
            }
          });

  };

  // Transferir de una cuenta a otra
  $scope.transferir = function() {
    console.log('Transfiriendo saldo', $scope.transferData);

        // Posting data to php file
        $http({
          method  : 'PUT',
          url     : 'http://localhost:8000/transfer',
          data    : $scope.transferData, //forms user object
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
         })
          .success(function(data) {
            console.log('SUCCESS');
            $window.location.reload();
            if (data.errors) {
              // Showing errors.
              $scope.errorName = data.errors.name;
              $scope.errorUserName = data.errors.username;
              $scope.errorEmail = data.errors.email;
            } else {
              $scope.message = data.message;
            }
          });

  };

})

.controller('UsersCtrl', function($scope, $http) {
    $scope.users = [];
    $http({
      method: 'GET',
      url: 'http://127.0.0.1:8000/getusers',
    }).then(function successCallback(response) {
        $scope.users = [];
        for(var r in response.data) {
          var user = response.data[r];
          $scope.users.push(user);
        }
        console.log($scope.users);
    }, function errorCallback(response) {
        console.log(response);
    });
})

.controller('UserCtrl', function($scope, $stateParams, User) {
    $scope.user = User.get({userId: $stateParams.userId});
})

.controller('TransactionsCtrl', function($scope, Transaction) {
    $scope.transactions = Transaction.query();
})

.controller('SessionsCtrl', function($scope, Session) {
    $scope.sessions = Session.query();
})

.controller('SessionCtrl', function($scope, $stateParams, Session) {
    $scope.session = Session.get({sessionId: $stateParams.sessionId});
});
