'use strict';

var mongoose = require('mongoose'),
    NewsItem =require('../models/newsItem');

exports.all = function(req, res) {
    NewsItem.find().sort('-created').exec(function(err, newsItems) {
        if (err) {
            return res.json(500, {
                error: 'Cannot list the news items'
            });
        }

        var newsItem = new NewsItem({ title: 'Mike Miles got a contract extension yesterday.' });

        newsItem.save(function(err) {
            if (err) {
                return res.json(500, {
                    error: 'Cannot save the news item'
                });
            }
            res.json(newsItem);
        });


        //res.json(newsItems);

    });
};
