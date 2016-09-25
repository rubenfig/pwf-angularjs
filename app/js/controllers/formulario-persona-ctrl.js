/**
 * Clase encargada de manejar el listado de personas.
 * @class
 */
app.controller('formularioPersonaCtrl', ['$scope', 'personaService', 'datosCompartidos','$rootScope',
    function ($scope, personaService, datosCompartidos, $rootScope) {
        /**
         * Array que contiene los datos de la lista
         * @type Array
         * @field
         */

        $scope.persona = {};

        /**
         * Se encarga de agregar datos a la lista
         * @function
         */

        $scope.guardar = function () {
            var contact = angular.copy($scope.persona);
            datosCompartidos.newContact(contact)
                .then(function (response) {
                    $rootScope.persona = response.data;
                    window.open("#/agenda/"+response.data.id+"/editar/",'_self',false);
                    window.alert("¡Contacto guardado!");
                }, function(error) {
                    window.alert("¡No se pudo guardar el contacto!");
                });

        }
    }
]);
app.controller('formularioEditPersonaCtrl', ['$scope', 'personaService', 'datosCompartidos','$rootScope',
    function($scope, personaService, datosCompartidos, $rootScope){
        $scope.persona=$rootScope.persona;
        $scope.editContact = function (contact) {
            contact.fechamodificacion= new Date();
            datosCompartidos.editContact(contact)
                .then(function (response) {
                    $rootScope.persona={};
                    window.alert("¡Contacto modificado!");
                    window.open("#/",'_self',false);
                }, function (error) {
                    window.alert("Imposible modificar el contacto. --> "+ error);
                });
        };

    }]);
