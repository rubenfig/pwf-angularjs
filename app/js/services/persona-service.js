/*
 * @Class
 * Definición del service que se encarga de la comunicación con la capa de servicios. 
 * Abarca las operaciones que pueden ser realizads sobre el recurso Persona.
 */
app.service('personaService', ['$http', function ($http) {
    var urlBase = 'http://localhost:1337/163.172.218.124/pwf/rest/agenda';

    this.getContacts = function () {
        return $http.get(urlBase);
    };

    this.newContact = function (item) {
        return $http.post(urlBase, item);
    };

    this.getContact = function (id) {
        return $http.get(urlBase+ "/"+ id);
    };

}]);

