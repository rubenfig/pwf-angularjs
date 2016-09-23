/**
 * Clase encargada de manejar el listado de personas.
 * @class
 */
app.controller('listaPersonaCtrl', ['$scope', '$rootScope', 'datosCompartidos',
    function ($scope, $rootScope, datosCompartidos) {
        /**
         * Array que contiene los datos de la visualización
         * @type Array
         * @field
         */
        $scope.data = datosCompartidos;
        $scope.data.lista = [];
        $scope.persona = $rootScope.persona;
        $scope.buscar = "";

        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            //se realiza el get solo si no hay datos
            if ($scope.data.lista.length == 0) {
                getContacts();
            }
        })();

        function getContacts() {
            datosCompartidos.getContacts().then(function (response) {
                $scope.data = response.data;
            }, function (error) {
                window.alert("No se pudieron obtener los contactos --> "+error);
            });
        }

        $scope.getContact = function (contact) {
            datosCompartidos.getContact(contact.id)
                .then(function (response) {
                    $scope.persona = angular.copy(response.data);
                    $rootScope.persona = $scope.persona;
                    window.open("#agenda/"+contact.id+"/ver", '_self',false);
                }, function (error) {
                    window.alert("Imposible obtener el contacto.");
                });
        };
}]);
