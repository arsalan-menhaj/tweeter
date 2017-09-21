"use strict";

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // We have a connection to the "tweeter" db, starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  /*
  saveTweet: function(newTweet, callback) {
      tweets.push(newTweet);
      callback(null, true);
  },
  */

  getTweets: function() {
    db.collection("tweeter").find().toArray((err, tweets) => {
      if (err) {
        throw err;
      }
      console.log(tweets)
      return(tweets);
    });
  }

  getTweets();

  db.close();
});