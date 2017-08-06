var dashboardModule = angular.module('dashboard', ['util']);
dashboardModule.component('dashboard', {
    bindings :{
        query:"="
    },
    templateUrl: 'dashboard/dashboard.template.html',
    controller: ['$filter', '$interval', '$scope', 'dataSource', 'mapView',
        function DashboardController($filter, $interval, $scope, dataSource, mapView) {
            this.company = {};
            this.messages = {};
            this.objects = [];
            this.filteredObjects = [];
            var self = this;

            this.refresh = function() {
                self.query = "";
                dataSource.getObjects().then(function(response) {
                    self.objects = response.data.objects;
                    self.filteredObjects = self.objects;
                    mapView.updateMarkers(self.filteredObjects, self.messages);
                    $scope.$watch (
                        function(){return self.query;},
                        function() {self.filter();}
                    );
                });
            };

            this.filter = function() {
                self.filteredObjects = $filter('filter')(self.objects, self.query);
                if (self.filteredObjects.length > 0) {
                    mapView.updateMarkers(self.filteredObjects, self.messages);
                }
                else {
                    alert(self.messages.no_match + " '" + self.query + "'");
                }
            };

            this.toggleMarkerType = function() {
                mapView.statusMarker = !mapView.statusMarker;
                mapView.updateMarkers(self.filteredObjects, self.messages);
            }

            dataSource.getStatic().then(function(response) {
                self.company = response.data.company;
                self.messages = response.data.messages;
                mapView.initMap(self.company);
                self.refresh();
            });
            
            $interval(this.refresh, 300 * 1000);
        }
    ]
});