angular.module('salesMan')
    .controller('orderDetailsController', function ($rootScope, $scope) {
    var abc = $rootScope.orderDetails;
    console.log(abc);
    var myLatLng = new google.maps.LatLng($rootScope.orderDetails.lat, $rootScope.orderDetails.long);
    var map, marker;
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: myLatLng
    });
    marker = new google.maps.Marker({
        position: { lat: map.center.lat(), lng: map.center.lng() },
        map: map
    });
    //initMap();
});
