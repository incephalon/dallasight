'use strict';

angular.module('mean.system').controller('WeatherController', ['$scope', 'weatherData',
    function($scope, weatherData) {
        $scope.hello = 'from weather controller';

        $('#leftWrapper').css('visibility', 'hidden');

        $scope.map.zoom = 10;

        if ($scope.trafficLayer != null) {
            $scope.trafficLayer.setMap(null);
        }

        $scope.init = function () {
            $('#map-canvas').fadeTo('slow', 1, function () {
                // Animation complete.
            });

            $('#left').fadeOut('slow', function () {
                // Animation complete.
            });

            weatherData.getWeather()
                .success(function (data) {
                    //$scope.weather = data;
                    console.log('succcess from weather');
                    console.log(data);
                    // $scope.weather=[];
                    // for (var i=0; i<data['incidents'].length; i++){
                    //         $scope.weather.push(data['incidents'][i]);
                    // }

                })
                .error(function (error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });


//        $scope.weatherLayer = new google.maps.weather.WeatherLayer({
//            temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
//        });
//        $scope.weatherLayer.setMap($scope.map);
//
//        $scope.cloudLayer = new google.maps.weather.CloudLayer();
//        $scope.cloudLayer.setMap($scope.map);

        };

        $scope.init();
    }
]);
