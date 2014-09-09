'use strict';

angular.module('mean.system').controller('newsController', ['$scope', '$timeout', '$sce', 'NewsItems',
    function($scope, $timeout, $sce, NewsItems) {

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

        $timeout(function() {
            $scope.map.showMapMask = true;
            $scope.map.zoom = 14;
            $scope.map.clouds.show = false;
            $scope.map.traffic.show = false;
        });

        $scope.panHere = function (lat, long) {
            //e.preventDefault();
            var n = new google.maps.LatLng(lat, long);
            console.log("working");
            //map.panTo(n);

            //$scope.control.map.getGMap().panTo(n);
        };


        $scope.$on('$viewContentLoaded', function () {
            // var w = $("#leftWrapper").width();
            // var h = $("#leftWrapper").height();
            // console.log(w);
            // console.log(h);

            // $('iframe').css('margin-left', (w / 2) - 280);
            // $('iframe').css('margin-top', (h / 2) - 157);
        });

        // var ctaLayer = new google.maps.KmlLayer({
        //     url: 'http://dallasight.azurewebsites.net/Content/DallasCounty2011CommissionerPrecincts.kml'
        //   });
        //   ctaLayer.setMap(map);
    }
]);
