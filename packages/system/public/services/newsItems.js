'use strict';

angular.module('mean.system').factory('NewsItems', ['$resource',
    function($resource) {
        return $resource('news');
    }
]);
