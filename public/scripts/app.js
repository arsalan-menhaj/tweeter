/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Function returning an HTML template for a tweet element.
// The information pertaining to each tweet is provided
// by helper functions below
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

// Will accept arry of tweet objects
// and transfer relevant info to HTML template
function renderTweets(tweetsArray) {
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

// Will use jQuery to make requests to /tweets
// and receive JSON. Will also transfer JSON to renderTweets
function loadTweets() {
  $.get("/tweets").done(function(data) {
    renderTweets(data);
  });
}

// Helper function to toggle New Tweet area
function toggleNewTweet() {
  $(".new-tweet").slideToggle();
  $(".new-tweet").find("textarea").focus();
}

// Helper function for form validation
function takeInputText(input) {
  var $form = $('#new-tweet-submit');
  if (input === '') {
    $("#error-message").empty();
    $("#error-message").text("You have not typed anything to post!");
  } else if (input.length > 140) {
    $("#error-message").empty();
    $("#error-message").text("Your post is too long, please keep it to 140 characters or below.");
  } else {
    $.post("/tweets/", $form.serialize())
    .done(function(data) {
      console.log('Button clicked, performing ajax call...');
      $("#error-message").empty();
      $(document).find("#tweets-container").empty();
      loadTweets();
    }).fail(function(error) {
      console.error(error);
    })
  }
}

$(document).ready(function () {
  loadTweets();
  $("#compose-button").on("click", toggleNewTweet);
  var $form = $('#new-tweet-submit');
  $form.on('submit', function (event) {
    event.preventDefault();
    var formData = $(this).serialize();
    var inputValue = $("#new-tweet-input").val();
    takeInputText(inputValue);
  });
});// to add it to the page so we can make sure it's got all the right elements, classes, etc.