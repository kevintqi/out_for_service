var newobjModule = angular.module('newobj', []);
newobjModule.component('newobj', {
    templateUrl: 'newobj/newobj.template.html',
    controller: ['$http',
        function NewobjController($http) {
            this.object = {};
            this.saveObj = function() {
                alert(JSON.stringify(this.object));
                $http.post('model/newobj.json', this.object);
            }
        }
    ]
});