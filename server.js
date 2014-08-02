'use strict';
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://incephalon:lthnia90_@ds050087.mongolab.com:50087/themap');

// Requires meanio
var mean = require('meanio');

// Creates and serves mean application
mean.serve({ /*options placeholder*/ }, function(app, config) {
  console.log('Mean app started on port ' + config.port + ' (' + process.env.NODE_ENV + ')');
});
