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
            $scope.fecha = new Date();
            $scope.data.idMax++;
            $scope.persona.id=$scope.data.idMax;
            $scope.persona.fechaCreacion = $scope.fecha.getDate() + '-'
            + ($scope.fecha.getMonth()+1) + '-' + $scope.fecha.getFullYear();
            console.log($scope.persona);
            $scope.data.list.push(angular.copy($scope.persona));
            $scope.persona= {};
        }
    }
 ]);
