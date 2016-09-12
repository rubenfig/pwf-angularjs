var app = angular.module('pwfApp', ['ngRoute']);
// configure our routes
app.config(function ($routeProvider) {
    $routeProvider
        .when('/personas', {
            templateUrl: 'views/lista-persona-partial.html',
            controller: 'listaPersonaCtrl'
        });
});


app.factory('Shared', function () {
    return {
        list: []
    };
});
