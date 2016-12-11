angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $window, $rootScope, $location, $state, $ionicHistory) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.registerData = {};
  $scope.loginData = {};
  $scope.saldoData = {};
  $scope.transferData = {};

  // Create the register modal that we will use later
  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal_register = modal;
  });

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal_login = modal;
  });

  // Triggered in the register modal to close it
  $scope.closeRegister = function() {
    $scope.modal_register.hide();
  };

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal_login.hide();
  };

  // Open the register modal
  $scope.register = function() {
    $scope.modal_register.show();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal_login.show();
  };

// Perform the login action when the user submits the login form
  $scope.doRegister = function() {
    console.log('Registering', $scope.registerData);

      // heroku
      var url = 'http://tradeit-redes.herokuapp.com/postuser/'
      // local
      //var url = 'http://localhost:8000/postuser/'
        // Posting data to php file
        $http({
          method  : 'POST',
          url     : url,
          data    : $scope.registerData, //forms user object
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
         })
          .success(function(data) {

            if (data.errors) {
              // Showing errors.
              $scope.errorName = data.errors.name;
              $scope.errorUserName = data.errors.username;
              $scope.errorEmail = data.errors.email;
              alert("An error occurred during the registration")
            } else {
              alert('Account registered successfully!')
              console.log('SUCCESS');
              console.log(data);
              $scope.modal_register.hide();
              $scope.message = data.message;
            }
          });

  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

        // heroku
        var url = 'http://localhost:8000/getuser/'+$scope.loginData['username']
        // local
        //var url = 'http://localhost:8000/getuser/'+$scope.loginData['username']
        // Posting data to php file
        $http({
          method  : 'POST',
          url     : url,
          data    : $scope.loginData, //forms user object
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
         })
          .success(function(data) {
            console.log('SUCCESS');
            console.log(data);

            if (data.errors) {
              console.log('ERROR');
              alert("Error logging in");
              // Showing errors.
              $scope.errorName = data.errors.name;
              $scope.errorUserName = data.errors.username;
              $scope.errorEmail = data.errors.email;
            } else {
              $rootScope.username = data['username'];
              $rootScope.saldo = data['saldo'];
              alert('You have logged as ' + data['username'])
              $ionicHistory.nextViewOptions({
                disableBack: true
              });
              $state.go('app.welcome');
              $scope.modal_login.hide();
              $scope.message = data.message;
            }
          });

  };

  // Recargar saldo
  $scope.recargarSaldo = function() {
    console.log('recargando saldo', $scope.saldoData);

        // heroku
        var url = 'http://tradeit-redes.herokuapp.com/updateuser/'+$rootScope.username
        // local
        //var url = 'http://localhost:8000/updateuser/'+$rootScope.username

        // Posting data to php file
        $http({
          method  : 'PUT',
          url     : url,
          data    : $scope.saldoData, //forms user object
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
         })
          .success(function(data) {
            console.log('SUCCESS');
            console.log(data['saldo']);

            if (data.errors) {
              // Showing errors.
              $scope.errorName = data.errors.name;
              $scope.errorUserName = data.errors.username;
              $scope.errorEmail = data.errors.email;
              alert("Error during the operation")
            } else {
              $rootScope.saldo = data['saldo'];
              $ionicHistory.nextViewOptions({
                disableBack: true
              });
              alert("Successful opperation")
              $state.go('app.buycredits');
              $scope.message = data.message;
            }
          });

  };

  // Transferir de una cuenta a otra
  $scope.transferir = function() {
    console.log('Transfiriendo saldo', $scope.transferData);

        // heroku
        var url = 'http://tradeit-redes.herokuapp.com/transfer/'+$rootScope.username
        // local
        //var url = 'http://localhost:8000/transfer/'+$rootScope.username

        // Posting data to php file
        $http({
          method  : 'PUT',
          url     : url,
          data    : $scope.transferData, //forms user object
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
         })
          .success(function(data) {
            console.log('SUCCESS');
            console.log(data);
            if (data.errors) {
              console.log("ERROR")
              alert("Error during the transaction")
              // Showing errors.
              $scope.errorName = data.errors.name;
              $scope.errorUserName = data.errors.username;
              $scope.errorEmail = data.errors.email;
            } else {
              $rootScope.saldo = data['amount'];
              $ionicHistory.nextViewOptions({
                disableBack: true
              });
              alert("Successful transaction!")
              $state.go('app.transfer');
              $scope.message = data.message;
            }
          });

  };

  // Recargar transacciones
  $scope.transactions = function() {
    console.log('Transacciones');

        // heroku
        var url = 'http://tradeit-redes.herokuapp.com/transacciones'
        // local
        //var url = 'http://localhost:8000/transacciones'

        // Posting data to php file
        $http({
          method  : 'GET',
          url     : url,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
         })
          .success(function(data) {
            console.log('SUCCESS');
            console.log(data);
            $scope.transactions = [];
            for(var r in data) {
              var transaction = data[r];
              $scope.transactions.push(transaction);
            }
            if (data.errors) {
              console.log("ERROR")
              alert("Error loading transactions")
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

    // heroku
        var url = 'http://tradeit-redes.herokuapp.com/getusers'
        // local
        //var url = 'http://localhost:8000/getusers'

    $http({
      method: 'GET',
      url: url,
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

.controller('TransactionsCtrl', function($scope, $http) {
    $scope.transactions = [];

    // heroku
        var url = 'http://tradeit-redes.herokuapp.com/transactions'
        // local
        //var url = 'http://localhost:8000/transactions'

    $http({
      method: 'GET',
      url: url,
    }).then(function successCallback(response) {
        $scope.transactions = [];
        for(var r in response.data) {
          var transaction = response.data[r];
          $scope.transactions.push(transaction);
        }
        console.log($scope.transactions);
    }, function errorCallback(response) {
        console.log(response);
    });
})

.controller('SessionsCtrl', function($scope, Session) {
    $scope.sessions = Session.query();
})

.controller('SessionCtrl', function($scope, $stateParams, Session) {
    $scope.session = Session.get({sessionId: $stateParams.sessionId});
});
