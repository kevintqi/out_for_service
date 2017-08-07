var mainNavigationModule = angular.module('mainNavigation', []);
mainNavigationModule.component('mainNavigation', {
    templateUrl: 'main-navigation/mainNavigation.template.html',
    controller: [function MainNavigationController() {
            this.showView = 0;
            this.dashboardWidth = '';
            var self = this;

            this.toggleView = function(newView, dashboardWidth) {
                if (self.showView != newView) {
                    self.showView = newView;
                    self.dashboardWidth = dashboardWidth;
                }
                else {
                    self.showView = 0;
                    self.dashboardWidth = '';
                }
            }
        }
    ]
});