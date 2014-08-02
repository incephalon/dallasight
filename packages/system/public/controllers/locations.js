'use strict';

angular.module('mean.system').controller('LocationsController', function($scope){

    if($scope.cloudLayer!=null)
    {
        $scope.weatherLayer.setMap(null);
        $scope.cloudLayer.setMap(null);
    }
    if($scope.trafficLayer!=null)
    {
        $scope.trafficLayer.setMap(null);
    }

    $('#leftWrapper').css('visibility', 'hidden');

    $( '#map-canvas' ).fadeTo( 'slow' , .3, function() {
        // Animation complete.
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
            console.log(schools);
            //add them to the map

            var offset = Math.floor(Math.random() * 3) * 16; // pick one of the three icons in the sprite
            var count=468;
            // Calculate desired pixel-size of the marker
            var size = Math.floor(4*(count-1) + 8);
            var scaleFactor = size/16;

            for (var i = 0; i < schools.length; i++) {
                var schoolLocation = new google.maps.LatLng(schools[i]['latitude'], schools[i]['longitude']);
                marker = new google.maps.Marker({
                    position: schoolLocation,
                    map: map,
                    icon: new google.maps.MarkerImage(
                        'images/x2.jpg', // my 16x48 sprite with 3 circular icons
                        new google.maps.Size(16*scaleFactor, 16*scaleFactor), // desired size
                        new google.maps.Point(0, offset*scaleFactor), // offset within the scaled sprite
                        new google.maps.Point(size/2, size/2), // anchor point is half of the desired size
                        new google.maps.Size(16*scaleFactor, 48*scaleFactor) // scaled size of the entire sprite
                    )

                });
            }
        }
    }

});
