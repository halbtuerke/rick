/*
 * rick
 * https://github.com/halbtuerke/rick
 *
 * Copyright (c) 2014 Patrick Mosby
 * Licensed under the MIT license.
 */

'use strict';

var open = require('open');
var request = require('request'); 

var INTERVAL = 1000;

exports.awesome = function() {
  return 'awesome';
};

exports.interwebz = function(intervalInSeconds, subreddit) {
  intervalInSeconds = typeof intervalInSeconds !== 'undefined' ? intervalInSeconds : 60;
  subreddit = typeof subreddit !== 'undefined' ? subreddit : "gif";

  console.log('surfing the interwebz...');
  setInterval(function() {
    open('http://www.reddit.com/r/' + subreddit);
  }, INTERVAL * intervalInSeconds);
};

var privateRedditz = function(subreddit, type, directLink) {
  subreddit = typeof subreddit !== 'undefined' ? subreddit : "gif";
  type = typeof type !== 'undefined' ? type : "hot";
  directLink = typeof directLink !== 'undefined' ? directLink : false; 

  console.log('getting some random link...');
  
  var url = {
    uri :  "http://www.reddit.com/r/" + subreddit + "/" + type + ".json?limit=100",
  };
  
  request(url, function(error, response, body) {
    if (error || response.statusCode !== 200) {
      console.log("oh noez... somethingz wrong with the interwebz");
      return;
    }
    
    if (response.statusCode === 200) {
      var redditContent = JSON.parse(body),
          stories = redditContent.data.children.map(function (story) {
            if (story.data.score > 10) {
              if (directLink) {
                return story.data.url;
              } else {
                return story.data.permalink;
              }
            }
          }).filter(function (story) {
            return typeof story === 'undefined' ? false : true;
          });
      
      var randomIndex = Math.floor(Math.random() * stories.length);
      var randomStory = stories[randomIndex]; 

      if (directLink) {
        open(randomStory);
      } else {
        open("http://www.reddit.com" + randomStory);
      }

      return;
    }
    
    console.log("oh noez... somethingz wrong with the interwebz");
    return;
  });
}; 

exports.redditz = function(subreddit, type, directLink, interval) {
  interval = typeof interval !== 'undefined' ? interval : 10;
  console.log('surfing the interwebz...');
  setInterval(function() {
    privateRedditz(subreddit, type, directLink);
  }, INTERVAL * interval);
};

