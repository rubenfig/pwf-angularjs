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
                window.alert("No se pudieron obtener los contactos --> "+ error);
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

        $scope.removeContact = function (contact) {
            var result = window.confirm("¿Está seguro que desea borrar el contacto?");
            if(result == true){
                datosCompartidos.removeContact(contact.id).then(function (response) {
                    getContacts();
                    window.alert("¡Contacto elimindo!");
                    window.open("#personas/",'_self',false);
                }, function (error) {
                    window.alert("Imposible eliminar el contacto -->"+error);
                });
            } else {return false;}
        };

        $scope.edit = function(item){
            $scope.persona = angular.copy(item);
            $rootScope.persona = $scope.persona;
            window.open("#agenda/"+item.id+"/editar", '_self',false);
        };

        $scope.editContact = function (contact) {
            datosCompartidos.editContact(contact)
                .then(function (response) {
                    getContacts();
                    window.alert("¡Contacto modificado!");
                    window.open("#personas/",'_self',false);
                }, function (error) {
                    window.alert("Imposible modificar el contacto. --> "+ error);
                });
        };

}]);
