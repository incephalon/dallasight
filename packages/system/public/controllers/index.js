'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global',
    function ($scope, Global) {
        $scope.global = Global;

        $scope.map = {
            center: {
                latitude: 32.795903,
                longitude: -96.805301
            },
            zoom: 14,
            options: {
                //mapTypeId: google.maps.MapTypeId.SATELLITE,
                mapTypeId: google.maps.MapTypeId.HYBRID,
                disableDefaultUI: true
                //heading: 90,
                //tilt: 45
            },
            showMapMask: false,
            traffic: {
                show: false
            },
            clouds: {
                show: false
            },
            cta: {
                show: false,
                options: {}
            },
            layerType: 'TrafficLayer'
        };

        $scope.showLeft=true;
    }
]);
