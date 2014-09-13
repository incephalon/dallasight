'use strict';

angular.module('mean.system').controller('KmlController', ['$scope', '$timeout',
    function($scope, $timeout) {

        $timeout(function() {
            $scope.map.showMapMask = false;
            $scope.map.zoom = 12;
            $scope.map.clouds.show = false;
            $scope.map.traffic.show = false;
            $scope.map.cta.options = {
                url: 'http://commitcharts.azurewebsites.net/kmls/DallasCounty_2011CommissionerPrecincts.kml',
                preserveViewport: true
            };
            $scope.map.cta.show = true;
            $scope.showLeft = true;
        });
    }
]);
