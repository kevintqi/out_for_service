angular.module('dashboard', []);
angular.module('dashboard').component('dashboard', {
    templateUrl:'dashboard/dashboard.template.html',
    controller: function DashboardController($http) {
        var self = this;
        $http.get('model/objects.json').then(function(response) {
            self.objects = response.data.objects;
            updateMarkers(self);
        });
        initMap(self);
        addRefreshButton(self);
        setInterval(function(){updateObjects(self)}, 300*1000);
    }
});

function initMap(self) {
    var options = {
        center: new google.maps.LatLng(34.1022, -118.2737),
        zoom: 13,
        minZoom: 13,
        disableDefaultUI: false
    };
    self.map = new google.maps.Map(
        document.getElementById("map"), options
    );
    new google.maps.places.PlacesService(self.map);
    self.markers = [];
}

function updateObjects(self) {
    $.getJSON("model/objects.json", function(data, status){
        if (status === "success") {
            self.objects = data.objects;
            updateMarkers(self);
        }
    }); 
}

function updateMarkers(self) {
    while (self.markers.length !== 0) {
        var marker = self.markers.pop();
        marker.setMap(null);
        marker = null;
    }
    var latlngbounds = new google.maps.LatLngBounds();
    for (var i = 0; i < self.objects.length; ++i) {
        marker = createMarker(self, self.objects[i]);
        latlngbounds.extend(marker.position);
        self.markers.push(marker);
    }
    self.map.fitBounds(latlngbounds);
}

function createMarker(self, obj) {
    var contentString = '<div style="background-color:' + obj.status +'">'
                                + obj.name + '<br>' 
                                + obj.destination + '<br>' +
                                + obj.startTime + ' - ' + obj.endTime +
                        '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200
    });
    var marker = new google.maps.Marker({
        position: obj.position,
        icon: obj.icon,
        title: obj.name,
        map: self.map
    });
    marker.addListener('click', function() {
        infowindow.open(self.map, marker);
    });
    return marker;
}

function addRefreshButton(self) {
    $('#refresh').click(function(){updateObjects(self);});
}
