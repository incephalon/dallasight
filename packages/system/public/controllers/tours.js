'use strict';

angular.module('mean.system').controller('ToursController', function($scope){

    $('#leftWrapper').css('visibility', 'visible');
    $scope.mapBehavior.showMapMask = true;

    if($scope.cloudLayer!=null)
    {
        $scope.weatherLayer.setMap(null);
        $scope.cloudLayer.setMap(null);
    }
    if($scope.trafficLayer!=null)
    {
        $scope.trafficLayer.setMap(null);
    }

    $scope.tours=[
        {name:'DART Orange Line to DFW'},
        {name:'Meadows Museum'},
        {name:'Downtown Tunnels'},
        {name:'Arboretum'},
        {name:'Vogel Alcove'},
        {name:'The Bridge'},
        {name:'Trinity Audubon Center'},
        {name:'Katy Trail'},
        {name:'White Rock Trails'},
        {name:'Dallas Public Library'},
        {name:'DMV'}
    ];

});
