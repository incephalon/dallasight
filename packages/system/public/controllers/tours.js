'use strict';

angular.module('mean.system').controller('ToursController', function($scope, $timeout){

    $('#leftWrapper').css('visibility', 'visible');

    $timeout(function() {
        $scope.map.showMapMask = true;
        $scope.map.zoom = 14;
        $scope.map.clouds.show = false;
        $scope.map.traffic.show = false;
    });

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
