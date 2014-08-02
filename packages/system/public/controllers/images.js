'use strict';

angular.module('mean.system').controller('ImagesController', function($scope){

    var time = 0;
    $(".box").each(function(index) {
        $(this).delay(time).fadeIn(3000);
        time += 1000;
    });

});
