var newObjectModule = angular.module('newObject', []);
newObjectModule.component('newObject', {
    templateUrl: 'new-object/newObject.template.html',
    controller: ['$http',
        function NewObjectController($http) {
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