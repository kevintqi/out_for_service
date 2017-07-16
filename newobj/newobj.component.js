var newobjModule = angular.module('newobj', []);
newobjModule.component('newobj', {
    templateUrl: 'newobj/newobj.template.html',
    controller: ['$http', 'mainbody',
        function NewobjController($http) {
            this.object = {};

            this.save = function() {
                alert(JSON.stringify(this.object));
                $http.post('model/newobj.json', this.object);
            }
        }
    ]
});