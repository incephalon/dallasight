'use strict';

angular.module('mean.system').controller('GuidesController', function($scope){

    $('#leftWrapper').css('visibility', 'visible');
    $( "#map-canvas" ).fadeTo( "slow" , .3);
    $( "#thing" ).css( "height" , "100%");
    //$('#thing').css('background-color', 'transparent');

    if($scope.cloudLayer!=null)
    {
        $scope.weatherLayer.setMap(null);
        $scope.cloudLayer.setMap(null);
    }
    if($scope.trafficLayer!=null)
    {
        $scope.trafficLayer.setMap(null);
    }

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
