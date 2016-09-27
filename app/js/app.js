/**
 * Enrutador de la aplicación
 */
var app = angular.module('pwfApp', ['ngRoute', 'ui.bootstrap']);

// configure our routes
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/pwf-angularjs/app/views/lista-persona-partial.html',
            controller: 'listaPersonaCtrl'
        })

        .when('/agenda/:id/editar', {
            templateUrl: '/pwf-angularjs/app/views/modificar-persona.html',
            controller: 'formularioEditPersonaCtrl',
            method: 'edit'
        })

        .when('/agenda/:id/ver', {
            templateUrl: '/pwf-angularjs/app/views/detalle-persona.html',
            controller: 'listaPersonaCtrl',
            method: 'view'
        })

        .when('/agregar', {
            templateUrl: '/pwf-angularjs/app/views/formulario-persona-partial.html',
            controller: 'formularioPersonaCtrl'
        });
});

/**
 * Variable compartida entre los controladores. se utiliza para añadir
 * elementos a la lista de personas.
 */
app.factory('datosCompartidos', ['$http', function($http) {
    var urlBase = 'https://163.172.218.124/pwf/rest/agenda';
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
    datosCompartidos.getContacts = function(pagina, cantidad, filtro) {
        var posicion = (pagina-1)*10;
        return $http.get(urlBase + "?inicio="+posicion+"&cantidad="+cantidad+"&filtro="+filtro);
    };

    datosCompartidos.removeContact = function (id) {
        return $http.delete(urlBase+ "/" + id);
    };

    datosCompartidos.editContact = function (item) {
        return $http.put(urlBase + "/" + item.id, item);
    };

    return datosCompartidos;
}]);
