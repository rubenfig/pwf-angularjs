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
        $scope.filtro="";
        $scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.maxSize=5;

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
            datosCompartidos.getContacts($scope.currentPage, $scope.numPerPage, $scope.filtro).then(function(response) {
                $scope.total = response.data.total;
                angular.copy(response.data.lista, $scope.data.lista);
            }, function (error) {
                window.alert("No se pudieron obtener los contactos --> "+ error);
            });

        }
        $scope.busqueda = function (){
            getContacts();
        };
        $scope.pageChanged = function() {
            datosCompartidos.getContacts($scope.currentPage, $scope.numPerPage, $scope.filtro).then(function(response) {
                $scope.total = response.data.total;
                angular.copy(response.data.lista, $scope.data.lista);


            });
        };

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
                    window.open("#/",'_self',false);
                }, function (error) {
                    window.alert("Imposible eliminar el contacto -->"+error);
                });
            } else {return false;}
        };

        $scope.edit = function(item){
            $scope.persona = angular.copy(item);
            $rootScope.persona=$scope.persona;
            window.open("#agenda/"+item.id+"/editar/", '_self',false);
        };
        $scope.cerrar = function () {
            window.open("#/",'_self',false);
        };

        $scope.limpiar = function (){
            $scope.filtro="";
            getContacts();
        };

}]);
