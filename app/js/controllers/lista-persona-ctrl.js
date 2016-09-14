/**
 * Clase encargada de manejar el listado de personas.
 * @class
 */
app.controller('listaPersonaCtrl', ['$scope', 'personaService', 'Shared',

    function ($scope, personaService, Shared) {
        /**
         * Array que contiene los datos de la visualización
         * @type Array
         * @field
         */
        $scope.data = Shared;
        $scope.buscar='';
        $scope.busqueda='nombre';

        /**
         * Se encarga de obtener los datos de la visualización.
         * @function
         * @private
         */
        function getData(params) {
            personaService.obtener(params)
                .success(function (data) {
                    $scope.data.list = data;
                    $scope.data.idMax= data.length;
                }).error(function (data, code) {
                    alert("Error al obtener las personas");
                });
        }

        $scope.borrar = function()
        {
            $scope.data.list.splice($scope.selectedPersona,1);
            $scope.selectedPersona= undefined;
        };

        $scope.rowHighlited=function(row)
        {
            $scope.selectedPersona=row;
            console.log($scope.selectedPersona);
        };
                /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            //se realiza el get solo si no hay datos
            if ($scope.data.list.length == 0) {
                getData();
            }
        })();
    }
]);
