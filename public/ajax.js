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

$(document).ready(function() {
  var $form = $('#new-tweet-submit');
  $form.on('submit', function (event) {
    event.preventDefault();
    var formData = $(this).serialize();
    var inputValue = $("#new-tweet-input").val();

    if (inputValue === '') {
      $("#error-message").empty();
      $("#error-message").text("You have not typed anything to post!");
    } else if (inputValue.length > 140) {
      $("#error-message").empty();
      $("#error-message").text("Your post is too long, please keep it to 140 characters or below.");
    } else {
      $.post("/tweets/", formData)
      .done(function(data) {
        console.log('Button clicked, performing ajax call...');
        $("#error-message").empty();
        $(document).find("#tweets-container").empty();
        loadTweets();
      }).fail(function(error) {
        console.error(error);
      })
    }
  });
});

