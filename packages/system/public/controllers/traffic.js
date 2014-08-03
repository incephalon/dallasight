'use strict';

angular.module('mean.system').controller('TrafficController', ['$scope', 'trafficData',
    function($scope, trafficData) {

        //$( '#leftWrapper' ).load( 'cards/one.html' );

        $('#leftWrapper').css('visibility', 'hidden');
        $("#thing").css("height", "auto");
        $( "#map-canvas" ).fadeTo( "slow" , 1);
        // $( "#map-canvas" ).fadeTo( "slow" , 1, function(){

        // });
        map.setZoom(12);

        $scope.hello = 'from traffic controller';

        if ($scope.cloudLayer != null) {
            $scope.weatherLayer.setMap(null);
            $scope.cloudLayer.setMap(null);
        }

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

        $scope.init = function () {
            $scope.trafficLayer = new google.maps.TrafficLayer();
            $scope.trafficLayer.setMap($scope.map);
        };

        //$scope.init();

        $scope.goToAccident=function(lat, long)
        {
            //pan map there
            map.panTo(new google.maps.LatLng(lat, long));

        };

        //get weather stuff (from service?)
    }
]);
