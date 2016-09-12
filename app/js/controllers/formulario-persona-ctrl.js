/**
 * Clase encargada de manejar el listado de personas.
 * @class
 */
app.controller('formularioPersonaCtrl', ['$scope', 'Shared',
    function ($scope, Shared) {
        /**
         * Array que contiene los datos de la lista
         * @type Array
         * @field
         */
        $scope.data = Shared;
        $scope.persona = {};

        /**
         * Se encarga de agregar datos a la lista
         * @function
         */
        $scope.agregar = function (params) {
            $scope.data.list.push(angular.copy($scope.persona));
        }
    }
 ]);
