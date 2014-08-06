'use strict';

angular.module('mean.system').controller('LocationsController', function($scope, $timeout){

    $('#leftWrapper').css('visibility', 'hidden');
    $("#thing").css("height", "100%");

    $timeout(function() {
        $scope.map.showMapMask = true;
        $scope.map.zoom = 14;
        $scope.map.showClouds = false;
        $scope.map.showTraffic = false;
    });

    $scope.locations=[
        'Restaurants',
        'Shops',
        'Movie Theaters',
        'Schools',
        'Libraries',
        'Parks',
        'Construction',
        'Fire Stations',
        'Hospitals',
        'Grocery Stores',
        'police',
        'courts',
        'jails'
    ];

    $scope.putOnTheMap=function(thisLocation){
        console.log(thisLocation);
        if(thisLocation==='Schools')
        {
            $scope.fillSchools();
        }
        else if(thisLocation==="Restaurants")
        {
            $scope.fillRestaurants();
        }
    };



    $scope.fillSchools=function() {
        console.log(schools);
        //add them to the map

        $("#map-canvas").css('opacity', 1);

        var offset = Math.floor(Math.random() * 3) * 16; // pick one of the three icons in the sprite
        var count = 468;
        // Calculate desired pixel-size of the marker
        var size = Math.floor(4 * (count - 1) + 8);
        var scaleFactor = size / 16;

        for (var i = 0; i < schools.length; i++) {
            var schoolLocation = new google.maps.LatLng(schools[i]['latitude'], schools[i]['longitude']);
            $scope.marker = new google.maps.Marker({
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
        var parameters = [];
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
