var app = angular.module('myApp');

app.factory('trafficData', function($http, $q){
    
    return{
          
        
        getTraffic :function () {
                return $http.get("http://www.mapquestapi.com/traffic/v2/incidents?key=Fmjtd%7Cluur21u1n0%2Cbs%3Do5-90y2qf&inFormat=json&outFormat=json&json={boundingBox: { ul: { lat: 33.008832 , lng: -97.071890}, lr: { lat:                                     32.546983, lng: -96.522574}},filters:[incidents]}");
            }
    
    
    };
});