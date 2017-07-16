var newobjModule = angular.module('newobj', []);
newobjModule.component('newobj', {
    templateUrl: 'newobj/newobj.template.html',
    controller: ['$http',
        function NewobjController($http) {
            this.showContact = false;
            this.showAddress = false;
            this.showSchedule = false;
            this.object = {};
            this.validateObj = function() {
                this.showContact = true;
                this.showAddress = true;
            }
            this.saveObj = function() {
                var obj = this.object;
                alert(JSON.stringify(obj));
                $http.post('model/newobj.json', obj);
                this.object = {};
            }
        }
    ]
});