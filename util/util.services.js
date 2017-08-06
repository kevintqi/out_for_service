var utilModule = angular.module('util', []);

utilModule.factory('dataSource', function($http) {
    return {
        getStatic: function() {
            return $http.get('model/static.json');
        },
        getObjects: function() {
            return $http.get('model/objects.json');
        }
    };
});