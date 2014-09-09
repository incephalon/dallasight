'use strict';

angular.module('mean.system').controller('GuidesController', function($scope, $timeout){

    $('#leftWrapper').css('visibility', 'visible');
    $( "#thing" ).css( "height" , "100%");
    //$('#thing').css('background-color', 'transparent');

    $timeout(function() {
        $scope.map.showMapMask = true;
        $scope.map.zoom = 14;
        $scope.map.clouds.show = false;
        $scope.map.traffic.show = false;
    });

    $scope.guides=[
        {name:'STAAR Testing'},
        {name:'What is Home Rule?'},
        {name:'How to Become a Teacher in Texas'},
        {name:'Dallas City Council'},
        {name:'DISD'},
        {name:'DISD Board'},
        {name:'What is a County Comissioner?'},
        {name:'DART'},
        {name:'Texas Legislature'}
    ];

});
