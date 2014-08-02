'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global',
    function ($scope, Global) {
        $scope.global = Global;

        $scope.map = {
            center: new google.maps.LatLng(32.795903, -96.805301),
            zoom: 14,
            //mapTypeId: google.maps.MapTypeId.SATELLITE,
            mapTypeId: google.maps.MapTypeId.HYBRID,
            disableDefaultUI: true
            //heading: 90,
            //tilt: 45
        };
    }
]);
