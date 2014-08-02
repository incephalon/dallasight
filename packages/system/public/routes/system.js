'use strict';

//Setting up route
angular.module('mean.system').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        // For unmatched routes:
        $urlRouterProvider.otherwise('/');
        $urlRouterProvider.when('/', '/news');

        // states for my app
        $stateProvider
            .state('home', {
                abstract: true,
                url: '/',
                templateUrl: 'system/views/index.html'
            })
            .state('home.news', {
                url: 'news',
                views: {
                    'viewA': {
                        templateUrl: 'system/views/images.html'
                    },
                    'viewB': {
                        templateUrl: 'system/views/news.html',
                        controller: 'newsController'
                    }
                }
            })
            .state('home.guides', {
                url: "guides",
                views: {
                    "viewA": {
                        templateUrl: "system/views/guidesLeft.html"
                    },
                    "viewB": {
                        controller: 'GuidesController',
                        templateUrl: "system/views/guides.html"
                    }
                }
            })
            .state('home.events', {
                url: 'events',
                views: {
                    'viewA': {
                        templateUrl: 'system/views/images.html',
                        controller: 'ImagesController'
//                        controller:function($scope, $stateParams){
//                            var x = $stateParams.cool;
//                            console.log(x);
//                        }
                    },
                    'viewB': {
                        controller: 'EventsController',
                        templateUrl: 'system/views/events.html'
                        // controller:'DynamicCtrl',
                        //templateUrl: 'resources/angular/templates/nav/urlRouter.html',

                    }
                }
            })
            .state('home.locations', {
                url: 'locations',
                views: {
                    'viewA': {
                        templateUrl: 'system/views/poster.html'
                    },
                    'viewB': {
                        controller: 'LocationsController',
                        templateUrl: 'system/views/locations.html'
                    }
                }
            });
    }
]).config(['$locationProvider',
    function ($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
