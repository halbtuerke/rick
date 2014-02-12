/*
 * rick
 * https://github.com/halbtuerke/rick
 *
 * Copyright (c) 2014 Patrick Mosby
 * Licensed under the MIT license.
 */

'use strict';

var open = require('open');

var INTERVAL = 1000;

exports.awesome = function() {
    return 'awesome';
};

exports.interwebz = function(intervalInSeconds, subreddit) {
    intervalInSeconds = typeof intervalInSeconds !== 'undefined' ? intervalInSeconds : 60;
    subreddit = typeof subreddit  !== 'undefined' ? subreddit : "gif";

    console.log('surfing the interwebz...');
    setInterval(function() {
        open('http://www.reddit.com/r/' + subreddit);
    }, INTERVAL * intervalInSeconds);
};
