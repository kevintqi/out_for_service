dashboardModule.factory('mapView', function() {
    return {
        statusMarker: true,
        markers: [],
        map: null,
        initMap: function(company) {
            var options = {
                center: company.location,
                zoom: company.location.zoom,
                minZoom: company.location.minZoom,
                disableDefaultUI: false
            };
            this.map = new google.maps.Map(
                document.getElementById("map"), options
            );

            var self = this;
            this.map.addListener('click', function() {
                for (var i = 0; i < self.markers.length; ++i) {
                    self.markers[i].infoWindow.close();
                }
            });
        },
        updateMarkers: function(filteredObjects, messages) {
            while (this.markers.length !== 0) {
                var marker = this.markers.pop();
                marker.marker.setMap(null);
                marker = null;
            }
            var latlngbounds = new google.maps.LatLngBounds();
            for (var i = 0; i < filteredObjects.length; ++i) {
                marker = this.createMarker(filteredObjects[i], messages);
                if (marker) {
                    latlngbounds.extend(marker.marker.position);
                    this.markers.push(marker);
                }
            }
            this.map.fitBounds(latlngbounds);
        },
        createMarker: function(obj, messages) {
            var markerInfo = {};
            markerInfo.infoWindow = this.createInfoWindow(obj, messages);
            if (this.statusMarker) {
                markerInfo.marker = new google.maps.Marker({
                    position: obj.location,
                    icon: obj.statusIcon,
                    title: obj.status,
                    map: this.map
                });
            }
            else {
                markerInfo.marker = new google.maps.Marker({
                    position: obj.assignee.position,
                    icon: obj.assignee.icon,
                    title: obj.assignee.name,
                    map: this.map
                });
            }
            var self = this;
            markerInfo.marker.addListener('click', function() {
                for (var i = 0; i < self.markers.length; ++i) {
                    self.markers[i].infoWindow.close();
                }
                markerInfo.infoWindow.open(self.map, markerInfo.marker);
            });
            return markerInfo;
        },
        createInfoWindow: function(obj, messages) {
            function buildInfoContent() {
                var contentString = '<div class="w3-bar">';
                var assignee = '<div class="w3-bar-item w3-quarter w3-left w3-border-right">';
                if (obj.assignee) {
                    assignee += '<img src=' + obj.assignee.icon + '/>' + '<br/>' + obj.assignee.name;
                }
                else {
                    assignee += '<span class="w3-red">' + messages.not_assigned + '</span>';
                }
                assignee += '</div>';
                var details = '<div class="w3-bar-item w3-half"> <ul class="w3-ul w3-tiny">';
                var location = '<li class="w3-padding-small"><strong>' + obj.location.address + '</strong></li>';
                details += location;
                var schedule = '<li class="w3-border-0 w3-padding-small"> <span class="w3-tag w3-teal w3-round">' +
                    obj.targetTime.label + '</span>' +
                    obj.targetTime.start + ' - ' + obj.targetTime.end + '</li>';
                details += schedule;
                if (obj.actualTime) {
                    var actual = '<li class="w3-border-0 w3-padding-small"> <span class="w3-tag w3-teal w3-round">' +
                        obj.actualTime.label + '</span>' +
                        obj.actualTime.start + ' - ' + obj.actualTime.end + '</li>';
                    details += actual;
                }
                details += '</ul></div>';
                var status = '<div class="w3-bar-item w3-quarter w3-right w3-border-left">' +
                    '<img src=' + obj.statusIcon + '/>' +
                    '<br/>' + obj.status + '</div>';
                contentString += assignee;
                contentString += details;
                contentString += status;
                contentString += '</div';
                return contentString;
            }
            return new google.maps.InfoWindow({
                content: buildInfoContent()
            });
        }
    };
});
