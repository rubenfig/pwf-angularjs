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

        /**
         * Se encarga de obtener los datos de la visualización.
         * @function
         * @private
         */
        function getData(params) {
            personaService.obtener(params)
                .success(function (data) {
                    $scope.data.list = data;
                }).error(function (data, code) {
                    alert("Error al obtener las personas");
                });
        }


        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            getData();
        })();
    }
]);
