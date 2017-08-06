var mainbodyModule = angular.module('mainbody', []);
mainbodyModule.component('mainbody', {
    templateUrl: 'mainbody/mainbody.template.html',
    controller: [function MainbodyController() {
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