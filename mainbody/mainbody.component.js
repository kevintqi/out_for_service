var mainbodyModule = angular.module('mainbody', []);
mainbodyModule.component('mainbody', {
    templateUrl: 'mainbody/mainbody.template.html',
    controller: ['$scope',
        function MainbodyController($scope) {
            $scope.showView = 0;
            $scope.dashboardWidth = '';

            $scope.toggleView = function(newView, dashboardWidth) {
                if ($scope.showView != newView) {
                    $scope.showView = newView;
                    $scope.dashboardWidth = dashboardWidth;
                }
                else {
                    $scope.showView = 0;
                    $scope.dashboardWidth = '';
                }
            }
        }
    ]
});