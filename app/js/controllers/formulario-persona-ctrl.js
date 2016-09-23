/**
 * Clase encargada de manejar el listado de personas.
 * @class
 */
app.controller('formularioPersonaCtrl', ['$scope', 'personaService', 'datosCompartidos',
    function ($scope, personaService, datosCompartidos) {
        /**
         * Array que contiene los datos de la lista
         * @type Array
         * @field
         */

        $scope.persona = {};

        function getContacts() {
            datosCompartidos.getContacts().then(function (response) {
                $scope.data = response.data;
            }, function (error) {
                window.alert("No se pudieron obtener los contactos --> "+ error);
            });
        }

        /**
         * Se encarga de agregar datos a la lista
         * @function
         */

        $scope.guardar = function () {
            var contact = angular.copy($scope.persona);
            datosCompartidos.newContact(contact)
                .then(function (response) {
                    getContacts();
                    window.alert("¡Contacto guardado!");
                }, function(error) {
                    window.alert("¡No se pudo guardar el contacto!");
                });
            window.open("#personas/",'_self',false);

        }
    }
]);
