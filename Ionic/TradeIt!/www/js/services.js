angular.module('starter.services', ['ngResource'])

/*
******************************************
*************** LOCAL ********************
*/

/*
.factory('User', function ($resource) {
    return $resource('http://localhost:8000/getuser/:userId/');
})
*/
/*
******************************************
************** HEROKU ********************
*/

.factory('User', function ($resource) {
    return $resource('http://tradeit-redes.herokuapp.com/getuser/:userId/');
})
