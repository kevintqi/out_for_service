var dashboardModule = angular.module('dashboard', []);
dashboardModule.component('dashboard', {
    templateUrl: 'dashboard/dashboard.template.html',
    controller: ['$filter', '$interval', 'dataSource', 'mapView',
        function DashboardController($filter, $interval, dataSource, mapView) {
            this.company = {};
            this.messages = {};
            this.objects = [];
            this.query = "";
            this.filteredObjects = [];
            var self = this;

            this.refresh = function() {
                this.query = "";
                dataSource.getObjects().then(function(response) {
                    self.objects = response.data.objects;
                    self.filteredObjects = self.objects;
                    mapView.updateMarkers(self.filteredObjects, self.messages);
                });
            };

            self.filter = function() {
                this.filteredObjects = $filter('filter')(this.objects, this.query);
                if (this.filteredObjects.length > 0) {
                    mapView.updateMarkers(this.filteredObjects, this.messages);
                }
                else {
                    alert(this.messages.no_match + " '" + this.query + "'");
                }
            };

            self.toggleMarkerType = function() {
                mapView.statusMarker = !mapView.statusMarker;
                mapView.updateMarkers(this.filteredObjects, this.messages);
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