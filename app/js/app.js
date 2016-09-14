/**
 * Enrutador de la aplicación
 */
var app = angular.module('pwfApp', ['ngRoute']);
// configure our routes
app.config(function ($routeProvider) {
    $routeProvider
        .when('/personas', {
            templateUrl: 'views/lista-persona-partial.html',
            controller: 'listaPersonaCtrl'
        });
});

/**
 * Variable compartida entre los controladores. se utiliza para añadir
 * elementos a la lista de personas.
 */
app.factory('Shared', function () {
    return {
        list: []
    };
});
