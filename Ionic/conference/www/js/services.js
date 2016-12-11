angular.module('starter.services', ['ngResource'])

/*
******************************************
*************** LOCAL ********************
*/

.factory('Session', function ($resource) {
    return $resource('http://localhost:5000/sessions/:sessionId');
})

.factory('User', function ($resource) {
    return $resource('http://localhost:8000/getuser/:userId/');
})

.factory('Transaction', function ($resource) {
    return $resource('http://localhost:8000/transactions/');
});

/*
******************************************
************** HEROKU ********************
*/
/*
.factory('User', function ($resource) {
    return $resource('http://tradeit-redes.herokuapp.com/getuser/:userId/');
})

.factory('Transaction', function ($resource) {
    return $resource('http://tradeit-redes.herokuapp.com/transactions/');
});
*/
