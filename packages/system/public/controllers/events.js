'use strict';

angular.module('mean.system').controller('EventsController', function($scope){
    //$('#leftWrapper').html('');
    //$('#leftWrapper').css('visibility', 'hidden');
    $('#leftWrapper').css('visibility', 'visible');
    $( "#map-canvas" ).fadeTo( "slow" , .3);
    $( "#thing" ).css( "height" , "100%");

    if($scope.cloudLayer!=null)
    {
        $scope.weatherLayer.setMap(null);
        $scope.cloudLayer.setMap(null);
    }
    if($scope.trafficLayer!=null)
    {
        $scope.trafficLayer.setMap(null);
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
        var dir = 'pictures/one/';
        var myImages=['beyonce.jpg', 'beyonce2.jpg', 'beyonce3.jpg','beyonce4.jpg'];


        for(var i=0; i<4; i++){
            $('#leftWrapper').append($('<img src=' + dir + myImages[i] + '></img>'));
        }
    };
});
