var app = angular.module('myApp',["ui.router", "ngRoute", "ngResource", "ngSanitize","ngAnimate"]);
                                  
app.config(function($stateProvider){
$stateProvider
    .state('default', {
        url: "/",
        views: {
            "viewA": {
                templateUrl: "templates/guidesLeft.html"
            },
            "viewB": {
                templateUrl: "templates/news.html"
            }
        }
    })
    .state('news', {
        url: "/news",
        views: {
            "viewA": {
                templateUrl: "templates/guidesLeft.html"
            },
            "viewB": {
                templateUrl: "templates/news.html", 
                controller:"newsController"
            }
        }
    })
    .state('events', {
        url: "/events",
        views: {
            "viewA": {
                templateUrl: "templates/images.html",
                controller:'imagesController' 
//                controller:function($scope, $stateParams){
//                    var x = $stateParams.cool;
//                    console.log(x);
//                }
            },
            "viewB": {
                controller:"eventsController",
                templateUrl: 'templates/events.html'
               // controller:'DynamicCtrl',
                //templateUrl: 'resources/angular/templates/nav/urlRouter.html',

            }
        }
    })
    .state('locations', {
        url: "/locations",
        views: {
            "viewA": {
                templateUrl: "templates/poster.html"
            },
            "viewB": {
                controller:"locationsController",
                templateUrl: "templates/locations.html"
            }
        }
    })
    .state('weather', {
        url: "/weather",
        views: {
            "viewB": {
                controller:'weatherController',
                templateUrl: "templates/weather.html"
            }
        }
    })
    .state('traffic', {
        url: "/traffic",
        views: {
            "viewA": {
                templateUrl: "templates/poster.html"
            },
            "viewB": {
                controller:'trafficController',
                templateUrl: "templates/traffic.html"
            }
        }
    })
    .state('guides', {
        url: "/guides",
        views: {
            "viewA": {
                templateUrl: "templates/guidesLeft.html"
            },
            "viewB": {
                controller:'guidesController',
                templateUrl: "templates/guides.html"
            }
        }
    })
    .state('tours', {
        url: "/tours",
        views: {
            "viewA": {
                templateUrl: "templates/poster.html"
            },
            "viewB": {
                controller:'toursController',
                templateUrl: "templates/tours.html"
            }
        }
    })
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
    .state('guideposts', {
     //url: '/guideposts/{cardname}{number:(?:/[^/]+)?}',
     url: '/guideposts/{cardname}',
     views: {
       'viewA': {
           templateUrl:
                    function (stateParams){
                       //return 'guideposts/' + stateParams.cardname + '/' + stateParams.number + '.html';
                       return 'guideposts/' + stateParams.cardname + '.html';
               }
       },
         'viewB': {
           //template:""
             templateUrl:"templates/news.html",
             controller:"newsController"
       }   
     }
    })                                
                                  
});

app.controller('myC', function($scope){
   $scope.hello="world";  
    
});

app.controller('imagesController', function($scope){
    
    var time = 0;
    $(".box").each(function(index) {
      $(this).delay(time).fadeIn(3000);
      time += 1000;
    });
    
});


app.controller('newsController', ['$scope', '$sce', 'NewsItems',
  function($scope, $sce, NewsItems) {

      NewsItems.query(function(newsItems) {
          $scope.newsItems = newsItems;
      });
	  
	  $scope.renderHtml = function(html_code)
      {
	    return $sce.trustAsHtml(html_code);
      };

      //$("#leftWrapper").html("");
      //$("#leftWrapper").css("visibility", "hidden");
      $("#leftWrapper").css("visibility", "visible");

      if (cloudLayer != null) {
          weatherLayer.setMap(null);
          cloudLayer.setMap(null);
      }
      if (trafficLayer != null) {
          trafficLayer.setMap(null);
      }

      $scope.panHere = function (lat, long) {
          //e.preventDefault();
          var n = new google.maps.LatLng(lat, long);
          console.log("working");
          map.panTo(n);
      };


      $scope.$on('$viewContentLoaded', function () {
          var w = $("#leftWrapper").width();
          var h = $("#leftWrapper").height();
          console.log(w);
          console.log(h);

          $('iframe').css('margin-left', (w / 2) - 280);
          $('iframe').css('margin-top', (h / 2) - 157);
      });

      // var ctaLayer = new google.maps.KmlLayer({
      //     url: 'http://dallasight.azurewebsites.net/Content/DallasCounty2011CommissionerPrecincts.kml'
      //   });
      //   ctaLayer.setMap(map);
  }
]);

app.controller('eventsController', function($scope){  
        //$("#leftWrapper").html("");
        //$("#leftWrapper").css("visibility", "hidden");
        $("#leftWrapper").css("visibility", "visible");
        $( "#map-canvas" ).fadeTo( "slow" , .3);
        $( "#thing" ).css( "height" , "100%");
    
        if(cloudLayer!=null)
        {
            weatherLayer.setMap(null);
            cloudLayer.setMap(null);     
        }
        if(trafficLayer!=null)
        {
            trafficLayer.setMap(null);
        }
    
        $scope.events=[
            {name:"On the Run Tour (Beyonce & Jay-Z)", 
            where:'American Airlines Center',  
            location:"32.54989, -96.2468",
            description:'Beyonce and Jay-Z are coming!'
            }, 
            {name:"Real Madrid vs. AS Roma", 
            where:'Cotton Bowl', 
            location:"32.54989, -96.2468",
            description:'Ronaldo brings his Real Madrid club of La Liga to Dallas to take on AS Roma'
            },  
            {name:"DISD Pre-K Round Up", 
            where:'Zumaya Middle School',
            location:"32.54989, -96.2468",
            description:'Sign up for child for free Pre-K in DISD this saturday. Bounce houses, food and fun'}
        ];
    
    $scope.loadImages=function(eventNumber){
        //get all the images from a folder
                var dir = "pictures/one/";
        var myImages=["beyonce.jpg", "beyonce2.jpg", "beyonce3.jpg","beyonce4.jpg"];
        
        
        for(var i=0; i<4; i++){
            $("#leftWrapper").append($("<img src=" + dir + myImages[i] + "></img>")); 
        }   
    }
});

app.controller('guidesController', function($scope){  

        $("#leftWrapper").css("visibility", "visible");
        $( "#map-canvas" ).fadeTo( "slow" , .3);
        $( "#thing" ).css( "height" , "100%");
        //$("#thing").css("background-color", "transparent");
    
        if(cloudLayer!=null)
        {
            weatherLayer.setMap(null);
            cloudLayer.setMap(null);     
        }
        if(trafficLayer!=null)
        {
            trafficLayer.setMap(null);
        }
    
        $scope.guides=[
        {name:"STAAR Testing"}, 
        {name:"What is Home Rule?"},  
        {name:"How to Become a Teacher in Texas"},
        {name:"Dallas City Council"},  
        {name:"DISD"},
        {name:"DISD Board"},  
        {name:"What is a County Comissioner?"},  
        {name:"DART"},  
        {name:"Texas Legislature"}
        ];
    
});

app.controller('toursController', function($scope){  

        $("#leftWrapper").css("visibility", "visible");
    
        if(cloudLayer!=null)
        {
            weatherLayer.setMap(null);
            cloudLayer.setMap(null);     
        }
        if(trafficLayer!=null)
        {
            trafficLayer.setMap(null);
        }
    
        $scope.tours=[
            {name:"DART Orange Line to DFW"},
            {name:"Meadows Museum"},  
            {name:"Downtown Tunnels"}, 
            {name:"Arboretum"}, 
            {name:"Vogel Alcove"}, 
            {name:"The Bridge"}, 
            {name:"Trinity Audubon Center"}, 
            {name:"Katy Trail"}, 
            {name:"White Rock Trails"}, 
            {name:"Dallas Public Library"},
            {name:"DMV"}
        ];
    
});


app.controller('locationsController', function($scope){
    
    if(cloudLayer!=null)
    {
        weatherLayer.setMap(null);
        cloudLayer.setMap(null);     
    }
    if(trafficLayer!=null)
    {
        trafficLayer.setMap(null);
    }
    
    $("#leftWrapper").css("visibility", "hidden");
    $("#thing").css("height", "100%");
     
   $( "#map-canvas" ).fadeTo( "slow" , .3, function() {
    // Animation complete.
   });
    
   $scope.locations=[
       "Restaurants",  
       "Shops",
       "Movie Theaters",
       "Schools",
       "Libraries",
       "Parks",
       "Construction",
       "Fire Stations",
        "Hospitals",
       "Grocery Stores",
        "police",
       "courts",
       "jails"
   ]; 
    
    $scope.putOnTheMap=function(thisLocation){
        console.log(thisLocation);
       if(thisLocation==="Schools")
       {
            $scope.fillSchools();
       }
      else if(thisLocation==="Restaurants")
       {
            $scope.fillRestaurants();
       }
    };



    $scope.fillSchools=function(){
            console.log(schools);
                //add them to the map

                $("#map-canvas").css('opacity', 1);
       
       var offset = Math.floor(Math.random() * 3) * 16; // pick one of the three icons in the sprite
    var count=468;
    // Calculate desired pixel-size of the marker
    var size = Math.floor(4*(count-1) + 8);
    var scaleFactor = size/16;

            for (var i = 0; i < schools.length; i++) {
                var schoolLocation = new google.maps.LatLng(schools[i]['latitude'], schools[i]['longitude']);
                marker = new google.maps.Marker({
                    position: schoolLocation, 
                    map: map
                    //icon: new google.maps.MarkerImage(
                    // 'images/x2.jpg', // my 16x48 sprite with 3 circular icons
                    // new google.maps.Size(16*scaleFactor, 16*scaleFactor), // desired size
                    // new google.maps.Point(0, offset*scaleFactor), // offset within the scaled sprite
                    // new google.maps.Point(size/2, size/2), // anchor point is half of the desired size
                    // new google.maps.Size(16*scaleFactor, 48*scaleFactor) // scaled size of the entire sprite
                    //)
                
                });
            }


    };



        $scope.fillRestaurants=function(){
                    var auth = {
                //
                // Update with your auth tokens.
                //
                consumerKey : "cnnas9ADMQjJHHOp5vc4oQ",
                consumerSecret : "1pIjOutCcCEOFZyaXjSI_KIDsZg",
                accessToken : "sBRbUrUfOAu76r4bc-fPlGdw_sxkHJhy",
                // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
                // You wouldn't actually want to expose your access token secret like this in a real application.
                accessTokenSecret : "zhyYLJ9hJlOlwRMFCfDIY0wsprY",
                serviceProvider : {
                    signatureMethod : "HMAC-SHA1"
                }
            };

            var terms = 'food';
            var near = 'San+Francisco';

            var accessor = {
                consumerSecret : auth.consumerSecret,
                tokenSecret : auth.accessTokenSecret
            };
            parameters = [];
            parameters.push(['term', terms]);
            parameters.push(['location', near]);
            parameters.push(['callback', 'cb']);
            parameters.push(['oauth_consumer_key', auth.consumerKey]);
            parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
            parameters.push(['oauth_token', auth.accessToken]);
            parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

            var message = {
                'action' : 'http://api.yelp.com/v2/search',
                'method' : 'GET',
                'parameters' : parameters
            };

            OAuth.setTimestampAndNonce(message);
            OAuth.SignatureMethod.sign(message, accessor);

            var parameterMap = OAuth.getParameterMap(message.parameters);
            console.log(parameterMap);

            $.ajax({
                'url' : message.action,
                'data' : parameterMap,
                'dataType' : 'jsonp',
                'jsonpCallback' : 'cb',
                'success' : function(data, textStats, XMLHttpRequest) {
                    console.log("resturants");
                    console.log(data);
                    //$("body").append(output);
                }
            });



    };
    
    
});

app.controller('trafficController', function($scope, trafficData){
    
    //$( "#leftWrapper" ).load( "cards/one.html" );
    
    $("#leftWrapper").css("visibility", "hidden");
    $("#thing").css("height", "auto");
    $( "#map-canvas" ).fadeTo( "slow" , 1);
    // $( "#map-canvas" ).fadeTo( "slow" , 1, function(){

    // });
    map.setZoom(12);
    
    $scope.hello="from traffic controller";
    
    if(cloudLayer!=null)
    {
        weatherLayer.setMap(null);
        cloudLayer.setMap(null);     
    }
    
    trafficData.getTraffic()
            .success(function (data) {
                //$scope.traffic = data;
                //console.log("succcess from trafficdata["incidents"]");
                console.log(data);
                $scope.traffic=[];
                for (var i=0; i<data["incidents"].length; i++){
                        $scope.traffic.push(data["incidents"][i]);
                }

            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    
    //this where I could initialize stuff?
    
    $scope.init=function(){ 
            trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);  
    };
    
    $scope.init();
    
    $scope.goToAccident=function(lat, long)
    {
        //pan map there
        map.panTo(new google.maps.LatLng(lat, long));

    };
    //get weather stuff (from service?)
    
});

app.controller('weatherController', function($scope, weatherData){
    $scope.hello="from weather controller";
    
    $("#leftWrapper").css("visibility", "hidden");
    
    map.setZoom(10);
    
    if(trafficLayer!=null)
    {
        trafficLayer.setMap(null);
    }
    
    $scope.init=function(){
         $( "#map-canvas" ).fadeTo( "slow" , 1, function() {
            // Animation complete.
          });
        
        $( "#left" ).fadeOut( "slow", function() {
            // Animation complete.
          }); 

    weatherData.getWeather()
            .success(function (data) {
                //$scope.weather = data;
                console.log("succcess from weather");
                console.log(data);
                // $scope.weather=[];
                // for (var i=0; i<data["incidents"].length; i++){
                //         $scope.weather.push(data["incidents"][i]);
                // }

            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });



   
        
      weatherLayer = new google.maps.weather.WeatherLayer({
        temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
      });
      weatherLayer.setMap(map);

      cloudLayer = new google.maps.weather.CloudLayer();
      cloudLayer.setMap(map); 
 
    };
    
    $scope.init();
    
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