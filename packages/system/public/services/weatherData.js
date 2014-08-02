'use strict';

angular.module('mean.system').factory('weatherData', function($http, $q){
    return{
        getWeather :function () {
            return $http.jsonp("http://api.wunderground.com/api/1d9ddd1bf45d8b0a/forecast10day/geolookup/conditions/q/TX/Dallas.json");
        }
    };
});
