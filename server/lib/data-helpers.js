"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");



// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  var tweets = db.collection("tweeter").find().toArray();
  console.log(tweets);

  return {
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
        db.collection("tweeter").insertOne(newTweet);

        // Updates js array tweetsList accordingly
        tweets.then(function(tweetsList) {
          tweetsList.push(newTweet);
          callback(null, true);
        });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {

        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        tweets.then(function(tweetsList) {
          tweetsList = tweetsList.sort(sortNewestFirst);
          callback(null, tweetsList);
        });
    }
  };
}
