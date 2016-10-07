/**
 * Enrutador de la aplicación
 */
var app = angular.module('pwfApp', ['ngRoute', 'ui.bootstrap']);

// configure our routes
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/lista-persona-partial.html',
            controller: 'listaPersonaCtrl'
        })

        .when('/agenda/:id/editar', {
            templateUrl: 'views/modificar-persona.html',
            controller: 'formularioEditPersonaCtrl',
        })

        .when('/agenda/:id/ver', {
            templateUrl: 'views/detalle-persona.html',
            controller: 'listaPersonaCtrl',
        })

        .when('/agregar', {
            templateUrl: 'views/formulario-persona-partial.html',
            controller: 'formularioPersonaCtrl'
        });
});

/**
 * Variable compartida entre los controladores. se utiliza para añadir
 * elementos a la lista de personas.
 */
app.factory('datosCompartidos', ['$http', function($http) {
    var urlBase = 'https://desa03.konecta.com.py/pwf/rest/agenda';
    var datosCompartidos = {};
    datosCompartidos.getContacts = function () {
        return $http.get(urlBase);
    };

    datosCompartidos.newContact = function (item) {
        if(!item.alias)
            item.alias="";
        if(!item.direccion)
            item.direccion="";
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

app.directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Estas seguro?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }]);
app.directive('loading',   ['$http' ,function ($http)
{
    return {
        link: function (scope, elm, attrs)
        {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (v)
            {
                if(v){
                    elm.show();
                }else{
                    elm.hide();
                }
            });
        }
    };

}]);

app.run(function(paginationConfig){
    paginationConfig.firstText='Primero';
    paginationConfig.previousText='Anterior';
    paginationConfig.lastText='Último';
    paginationConfig.nextText='Siguiente';
});
