angular.module('dashboard', []);
angular.module('dashboard').component('dashboard', {
    templateUrl: 'dashboard/dashboard.template.html',
    controller: ['$http', '$filter', function DashboardController($http, $filter) {
        var self = this;
        $http.get('model/objects.json').then(function(response) {
            self.objects = response.data.objects;
            self.company = response.data.company;
            self.messages = response.data.messages;
            self.filteredObjects = self.objects;
            updateMarkers(self);
        });

        initMap(self, $filter);
        self.refresh = function() {
            updateObjects(self);
        };
        self.toggleMarkerType = function() {
            self.statusMarker = !self.statusMarker;
            updateMarkers(self);
        }
        setInterval(function() {
            updateObjects(self)
        }, 300 * 1000);
    }]
});

function initMap(self, $filter) {
    var options = {
        center: new google.maps.LatLng(34.1022, -118.2737),
        zoom: 13,
        minZoom: 13,
        disableDefaultUI: false
    };
    self.map = new google.maps.Map(
        document.getElementById("map"), options
    );
    self.statusMarker = true;
    self.markers = [];
    self.onSearch = function onSearch() {
        self.filteredObjects = $filter('filter')(self.objects, self.query);
        if (self.filteredObjects.length > 0) {
            updateMarkers(self);
        } else {
            alert(self.messages.no_match + " '" + self.query + "'");
        }
    };
    self.map.addListener('click', function() {
        updateMarkers(self);
    });
}

function updateObjects(self) {
    self.query = "";
    $.getJSON("model/objects.json", function(data, status) {
        if (status === "success") {
            self.objects = data.objects;
            self.filteredObjects = self.objects;
            updateMarkers(self);
        }
    });
}

function updateMarkers(self) {
    while (self.markers.length !== 0) {
        var marker = self.markers.pop();
        marker.marker.setMap(null);
        marker = null;
    }
    var latlngbounds = new google.maps.LatLngBounds();
    for (var i = 0; i < self.filteredObjects.length; ++i) {
        if (self.statusMarker) {
            marker = createStatusMarker(self, self.filteredObjects[i]);
        }
        else {
            marker = createAssigneeMarker(self, self.filteredObjects[i]);
        }
        if (marker) {
            latlngbounds.extend(marker.marker.position);
            self.markers.push(marker);
        }
    }
    self.map.fitBounds(latlngbounds);
}

function createStatusMarker(self, obj) {
    var markerInfo = {};
    markerInfo.infoWindow = new google.maps.InfoWindow({
        content: buildInfoContent(self, obj)
    });
    markerInfo.marker = new google.maps.Marker({
        position: obj.location,
        icon: obj.statusIcon,
        title: obj.status,
        map: self.map
    });
    markerInfo.marker.addListener('click', function() {
        for (var i = 0; i < self.markers.length; ++i) {
            self.markers[i].infoWindow.close();
        }
        markerInfo.infoWindow.open(self.map, markerInfo.marker);
    });
    return markerInfo;
}

function createAssigneeMarker(self, obj) {
    if (!obj.assignee) {
        return undefined;
    }
    var markerInfo = {};
    markerInfo.infoWindow = new google.maps.InfoWindow({
        content: buildInfoContent(self, obj)
    });
    markerInfo.marker = new google.maps.Marker({
        position: obj.assignee.position,
        icon: obj.assignee.icon,
        title: obj.assignee.name,
        map: self.map
    });
    markerInfo.marker.addListener('click', function() {
        for (var i = 0; i < self.markers.length; ++i) {
            self.markers[i].infoWindow.close();
        }
        markerInfo.infoWindow.open(self.map, markerInfo.marker);
    });
    return markerInfo;
}

function buildInfoContent(self, obj) {
    var contentString = '<div class="w3-bar">';
    var assignee = '<div class="w3-bar-item w3-quarter w3-left w3-border-right">';
    if (obj.assignee) {
       assignee += '<img src=' + obj.assignee.icon + '/>' + '<br/>' + obj.assignee.name;
    } else {
        assignee += '<span class="w3-red">' + self.messages.not_assigned + '</span>';
    }
    assignee +=  '</div>';
    var details = '<div class="w3-bar-item w3-half"> <ul class="w3-ul w3-tiny">';
    var location ='<li class="w3-padding-small"><strong>' + obj.location.address + '</strong></li>';
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