var utilModule = angular.module('util', []);

utilModule.factory('dataSource', function ($http, $q) {
    return {
        baseUrl: 'http://192.168.86.71:3000',
        getCompany: function () {
            return this.getData(this.baseUrl + '/api/company',
                function t(data) { return data; });
        },
        getMessages: function () {
            return this.getData('model/messages.json',
                function t(data) { return data; });
        },
        getObjects: function () {
            return this.getData('model/objects.json',
                function t(data) { return data; });
        },
        postLogin: function(data) {
            return $http.post(this.baseUrl + '/login', data);
        },
        getData: function (url, transform) {
            var d = $q.defer();
            $http.get(url)
                .then(function (response) {
                    var data = transform(response);
                    d.resolve(data);
                })
                .catch(function (response) {
                    d.reject(response);
                });
            return d.promise;
        }
    };
});