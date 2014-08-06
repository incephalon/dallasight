'use strict';

angular.module('mean.system').controller('WeatherController', ['$scope', '$timeout', 'weatherData',
    function($scope, $timeout, weatherData) {
        $scope.hello = 'from weather controller';

        $('#leftWrapper').css('visibility', 'hidden');

        $timeout(function() {
            $scope.map.showMapMask = false;
            $scope.map.zoom = 10;
            $scope.map.showClouds = true;
            $scope.map.showTraffic = false;
        });

        $scope.init = function () {
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
                    //$scope.status = 'Unable to load customer data: ' + error.message;
                });


//        $scope.weatherLayer = new google.maps.weather.WeatherLayer({
//            temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
//        });
//        $scope.weatherLayer.setMap($scope.map);

        };

        $scope.init();
    }
]);
