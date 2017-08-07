var utilModule = angular.module('util', []);

utilModule.factory('dataSource', function($http) {
    return {
        getCompany: function() {
            return $http.get('model/company.json');
        },
        getMessages: function() {
            return $http.get('model/messages.json');
        },
        getObjects: function() {
            return $http.get('model/objects.json');
        }
    };
});