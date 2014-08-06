'use strict';

angular.module('mean.system').controller('TrafficController', ['$scope', '$timeout', 'trafficData',
    function($scope, $timeout, trafficData) {

        //$( '#leftWrapper' ).load( 'cards/one.html' );

        $('#leftWrapper').css('visibility', 'hidden');
        $("#thing").css("height", "auto");

        $timeout(function() {
            $scope.map.showMapMask = false;
            $scope.map.zoom = 12;
            $scope.map.showClouds = false;
            $scope.map.showTraffic = true;
            $scope.showLeft=false;
        });

        $scope.hello = 'from traffic controller';

        trafficData.getTraffic()
            .success(function (data) {
                //$scope.traffic = data;
                //console.log('succcess from trafficdata['incidents']');
                console.log(data);
                $scope.traffic = [];
                for (var i = 0; i < data['incidents'].length; i++) {
                    $scope.traffic.push(data['incidents'][i]);
                }

            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });

        //this where I could initialize stuff?

        $scope.goToAccident=function(lat, long)
        {
            //pan map there
            map.panTo(new google.maps.LatLng(lat, long));

        };

        //get weather stuff (from service?)
    }
]);
