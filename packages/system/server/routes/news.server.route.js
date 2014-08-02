'use strict';

var news = require('../controllers/news.server.controller');

module.exports = function(System, app, auth, database) {
    app.route('/news')
        .get(news.all);
};
