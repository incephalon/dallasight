var app = angular.module('myApp',["ui.router", "ngRoute", "ngResource", "ngSanitize"]);
                                  
app.config(function($stateProvider){
$stateProvider
    .state('maps', {
        url: "/maps",
        views: {
             "viewA": {
                templateUrl: "templates/poster.html"
            },
            "viewB": {
                controller:'mapsController',
                templateUrl: "templates/maps.html"
            }
        }
    })

                                  
});

app.controller('mapsController', function($scope){


    if(cloudLayer!=null)
    {
        weatherLayer.setMap(null);
        cloudLayer.setMap(null);     
    }
    if(trafficLayer!=null)
    {
        trafficLayer.setMap(null);
    }

        //$("#leftWrapper").html("");
        //$("#leftWrapper").css("visibility", "hidden");
        //$("#leftWrapper").css("visibility", "visible");
    
        // if(cloudLayer!=null)
        // {
        //     weatherLayer.setMap(null);
        //     cloudLayer.setMap(null);     
        // }
        // if(trafficLayer!=null)
        // {
        //     trafficLayer.setMap(null);
        // }
        map.setZoom(10);
        map.panTo(new google.maps.LatLng(32.756302, -96.147348));
        
    
        $scope.maps=[
        {name:"DISD Trustees", file:''}, 
        {name:"TX Board of Education", file:''}, 
        {name:"Dallas County Commissioners", file:'http://dallasightTwo.azurewebsites.net/Content/DallasCounty2011CommissionerPrecincts.kml'}, 
        {name:"Cities", file:''}, 
        {name:"Counties", file:'http://dallasightTwo.azurewebsites.net/Content/DallasCounty2011CommissionerPrecincts.kml'}, 
        {name:"Dallas County Constables", file:''}, 
        {name:"Dallas City Council", file:'http://dallasightTwo.azurewebsites.net/Content/DallasCityCouncil.kml'}, 
        {name:"TX House", file:''}, 
        {name:"TX Senate", file:''},
        {name:"US House", file:''},
        {name:"Dallas Parks", file:'http://dallasightTwo.azurewebsites.net/Content/DallasParks.kml'}
        ];
    
    $scope.loadMap=function(theFile){
        //get all the images from a folder

//32.756302, -96.147348

        console.log("map load");
        //remove the other one
        ctaLayer = new google.maps.KmlLayer({
          url: theFile,
          preserveViewport: true
        });
        ctaLayer.setMap(map);   
    }
});






    var map;
    var weatherLayer; 
    var cloudLayer;
    var trafficLayer;
    var ctaLayer;
    var bounds;
    var projection;
    //var markers = new OpenLayers.Layer.Markers("Markers");


    function initialize() {
      var mapOptions = {
        center: new google.maps.LatLng(32.795903, -96.805301),
        zoom: 14,
        //mapTypeId: google.maps.MapTypeId.SATELLITE,
          mapTypeId: google.maps.MapTypeId.HYBRID,
        disableDefaultUI: true
        //heading: 90,
        //tilt: 45
      };
      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      map.setTilt(0);
        bounds=new google.maps.LatLngBounds();
         projection = map.getProjection();
    offsetCenter(map.getCenter(), 100, 200);
        
        
        
        
    google.maps.event.addListener(map, 'click', function(event) {

        marker = new google.maps.Marker({position: event.latLng, map: map});
        console.log(event.latLng);

    });
        
    }

    google.maps.event.addDomListener(window, 'load', initialize);

function smoothZoom (map, max, cnt) {
    if (cnt >= max) {
            return;
        }
    else {
        z = google.maps.event.addListener(map, 'zoom_changed', function(event){
            google.maps.event.removeListener(z);
            smoothZoom(map, max, cnt + 1);
        });
        setTimeout(function(){map.setZoom(cnt)}, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
    }
} 

function offsetCenter(latlng,offsetx,offsety) {

// latlng is the apparent centre-point
// offsetx is the distance you want that point to move to the right, in pixels
// offsety is the distance you want that point to move upwards, in pixels
// offset can be negative
// offsetx and offsety are both optional

var scale = Math.pow(2, map.getZoom());
var nw = new google.maps.LatLng(
//    map.getBounds().getNorthEast().lat(),
//    map.getBounds().getSouthWest().lng()
    
       bounds.getNorthEast().lat(),
    bounds.getSouthWest().lng()
);

var worldCoordinateCenter = projection.fromLatLngToPoint(latlng);
var pixelOffset = new google.maps.Point((offsetx/scale) || 0,(offsety/scale) ||0)

var worldCoordinateNewCenter = new google.maps.Point(
    worldCoordinateCenter.x - pixelOffset.x,
    worldCoordinateCenter.y + pixelOffset.y
);

var newCenter = map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);

map.setCenter(newCenter);
return null;
}