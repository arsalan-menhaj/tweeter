/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

var tweetHTML = `"<article class="tweet">
            <header>
              <img class="logo" src="/images/images.png">
              <h2 class="username">Username</h2>
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
          </html>"`


// More efficient method in which an existing HTML template is
// used and returned
function createTweetElement1(tweet) {
  var tweetHTML = `<article class="tweet">
            <header>
              <img class="avatar" src="${tweet.user.avatars.small}">
              <h2 class="username">${tweet.user.name}</h2>
              <div class="empty"> </div>
            </header>
            <p class="content">${tweet.content.text}</p>
            <footer>
              <p class="timestamp">${moment(tweet.created_at).fromNow()}</p>
              <img class="icon" src="/images/icons/flag.png">
              <img class="icon" src="/images/icons/retweet.png">
              <img class="icon" src="/images/icons/like.png">
            </footer>
          </article>
          </html>`

  return tweetHTML;
}



// Less efficient method in which elements are constructed using jQuery
function createTweetElement2(tweet) {
  var $tweet = $("<article>").addClass("tweet");

  // Create header
  // Set avatar and username
  var header = $("<header>");
  var avatar = $("<img>").attr("src", tweet.user.avatars.small).addClass("avatar");
  header.append(avatar);


  var username = $("<h2>").addClass("username");
  username.text(tweet.user.name);
  header.append(username);

  var empty = $("<div>").addClass("empty")
  header.append(empty);

  $tweet.append(header);

  // Create body
  // Set tweet content
  var body = $("<p>");
  body.addClass("content");
  body.text(tweet.content.text);
  $tweet.append(body);

  // Create footer
  // Set timestamp and action icons
  var footer = $("<footer>");
  var timestamp = $("<p>");
  timestamp.text(moment(tweet.created_at).fromNow());
  footer.append(timestamp);

  var icon1 = $("<img>");
  icon1.addClass("icon");
  icon1.attr("src","/images/icons/flag.png");
  footer.append(icon1);

  var icon2 = $("<img>");
  icon2.addClass("icon");
  icon2.attr("src","/images/icons/retweet.png");
  footer.append(icon2);

  var icon3 = $("<img>");
  icon3.addClass("icon");
  icon3.attr("src","/images/icons/like.png");
  footer.append(icon3);

  $tweet.append(footer);

  return $tweet;
}

function renderTweets(tweets) {
  for (var tweet of tweets) {
    $tweet = createTweetElement1(tweet);
    $('#tweets-container').append($tweet);
  }
}




$(document).ready(function () {
  renderTweets(data);
});// to add it to the page so we can make sure it's got all the right elements, classes, etc.