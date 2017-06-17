var outForServiceApp = angular.module('outForService', []);
outForServiceApp.controller('MapController', function($scope) {
    initMap($scope);
    updateObjects($scope);
    setInterval(function(){updateObjects($scope)}, 30*1000);
    addRefreshButton($scope);
});

var markers = [];

function initMap($scope) {
    var options = {
        center: new google.maps.LatLng(34.1022, -118.2737),
        zoom: 13,
        minZoom: 13,
        disableDefaultUI: false
    };
    $scope.map = new google.maps.Map(
        document.getElementById("map"), options
    );
    new google.maps.places.PlacesService($scope.map);
    $scope.markers = [];
}

function updateObjects($scope) {
    $.getJSON("model/objects.json", function(data, status){
        if (status === "success") {
            updateMarkers($scope, data.objects);
        }
    }); 
}

function updateMarkers($scope, objects) {
    while ($scope.markers.length !== 0) {
        var marker = $scope.markers.pop();
        marker.setMap(null);
        marker = null;
    }
    var latlngbounds = new google.maps.LatLngBounds();
    for (var i = 0; i < objects.length; ++i) {
        marker = createMarker($scope, objects[i]);
        latlngbounds.extend(marker.position);
        $scope.markers.push(marker);
    }
    $scope.map.fitBounds(latlngbounds);
}

function createMarker($scope, obj) {
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
        map: $scope.map
    });
    marker.addListener('click', function() {
        infowindow.open($scope.map, marker);
    });
    return marker;
}

function addRefreshButton($scope) {
    $('#refresh').click(function(){updateObjects($scope);});
}
