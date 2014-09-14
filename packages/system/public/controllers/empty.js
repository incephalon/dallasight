'use strict';

angular.module('mean.system').controller('emptyController', ['$scope', '$timeout',
    function($scope, $timeout) {

        $timeout(function() {
            $scope.map.showMapMask = true;
            $scope.map.zoom = 14;
            $scope.map.clouds.show = false;
            $scope.map.traffic.show = false;
            $scope.map.cta.show = false;
        });
    }
]);
