angular.module('starter.services', ['ngResource'])

.factory('Session', function ($resource) {
    return $resource('http://localhost:5000/sessions/:sessionId');
})

.factory('User', function ($resource) {
    return $resource('http://localhost:8000/getuser/:userId/');
});
