'use strict';

//Setting up route
angular.module('mean.system').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        // For unmatched routes:
        $urlRouterProvider.otherwise('/');

        // states for my app
        $stateProvider
            .state('home', {
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
            });
    }
]).config(['$locationProvider',
    function ($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
