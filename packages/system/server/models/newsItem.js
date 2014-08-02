'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * NewsItem Schema
 */
var NewsItemSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('NewsItem', NewsItemSchema);
