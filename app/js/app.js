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
        })

        .when('/agenda/:id/editar', {
            templateUrl: 'views/edit.html',
            controller: 'listaPersonaCtrl',
            method: 'edit'
        })

        .when('/agenda/:id/ver', {
            templateUrl: 'views/view.html',
            controller: 'listaPersonaCtrl',
            method: 'view'
        })

        .when('/', {
            templateUrl: 'views/formulario-persona-partial.html',
            controller: 'formularioPersonaCtrl'
        });
});

/**
 * Variable compartida entre los controladores. se utiliza para añadir
 * elementos a la lista de personas.
 */
app.factory('datosCompartidos', ['$http', function($http) {
    var urlBase = 'http://localhost:1337/163.172.218.124/pwf/rest/agenda';
    var datosCompartidos = {};
    datosCompartidos.getContacts = function () {
        return $http.get(urlBase);
    };

    datosCompartidos.newContact = function (item) {
        return $http.post(urlBase, item);
    };

    return datosCompartidos;
}]);
