var mainbodyModule = angular.module('mainbody', []);
mainbodyModule.component('mainbody', {
    templateUrl: 'mainbody/mainbody.template.html',
    controller: ['$scope',
        function MainbodyController($scope) {
            $scope.showNewObj = false;
            $scope.dashboardWidth = '';

            $scope.toggleNewObj = function() {
                $scope.showNewObj = !$scope.showNewObj;
                if ($scope.showNewObj) {
                    $scope.dashboardWidth = 'w3-threequarter';
                }
                else {
                    $scope.dashboardWidth = '';
                }
            }
        }
    ]
});