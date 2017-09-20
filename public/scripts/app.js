/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// More efficient method in which an existing HTML template is
// used and returned
function createTweetElement1() {

  var tweetHTML = `<article class="tweet">
            <header>
              <img class="avatar">
              <h2 class="username"></h2>
              <div class="empty"> </div>
            </header>
            <p class="content"></p>
            <footer>
              <p class="timestamp"></p>
              <img class="icon" src="/images/icons/flag.png">
              <img class="icon" src="/images/icons/retweet.png">
              <img class="icon" src="/images/icons/like.png">
            </footer>
          </article>
          </html>`

  return tweetHTML;
}


function renderTweets(tweetsArray) {
  // var tweetsArray = loadTweets(url);
  for (var tweet of tweetsArray) {
    $tweet = createTweetElement1(tweet);
    $('#tweets-container').prepend($tweet);
    $('#tweets-container').find(".content:first").text(tweet.content.text);
    $('#tweets-container').find(".avatar:first").text();
    $('#tweets-container').find(".username:first").text(tweet.user.name);
    $('#tweets-container').find(".timestamp:first").text(moment(tweet.created_at).fromNow());
    $('#tweets-container').find(".avatar:first").attr("src", tweet.user.avatars.small);
  }
}

function loadTweets() {
  // Will use jQuery to make requests to /tweets
  // and receive JSON

  $.get("/tweets").done(function(data) {
    renderTweets(data);
  });
}


$(document).ready(function () {
  loadTweets();
  $("#compose-button").on("click", function() {
    $(".new-tweet").slideToggle();
    $(".new-tweet").find("textarea").focus();
  });
});// to add it to the page so we can make sure it's got all the right elements, classes, etc.