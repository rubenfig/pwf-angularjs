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
            templateUrl: 'views/modificar-persona.html',
            controller: 'listaPersonaCtrl',
            method: 'edit'
        })

        .when('/agenda/:id/ver', {
            templateUrl: 'views/detalle-persona.html',
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

    datosCompartidos.getContact = function(id) {
        return $http.get(urlBase + "/" + id);
    };

    datosCompartidos.removeContact = function (id) {
        return $http.delete(urlBase+ "/" + id);
    };

    datosCompartidos.editContact = function (item) {
        return $http.put(urlBase + "/" + item.id, item);
    };

    return datosCompartidos;
}]);
