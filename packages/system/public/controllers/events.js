'use strict';

angular.module('mean.system').controller('EventsController', function($scope){
    //$('#leftWrapper').html('');
    //$('#leftWrapper').css('visibility', 'hidden');
    $('#leftWrapper').css('visibility', 'visible');

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
        {name:'Beyonce/Jay-Z Concert', location:'32.54989, -96.2468'},
        {name:'Real Madrid vs. Roma', location:'32.54989, -96.2468'},
        {name:'DISD Pre-K Round Up', location:'32.54989, -96.2468'}
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
