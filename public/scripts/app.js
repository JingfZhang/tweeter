/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(tweetData) {
  var $tweet = $("<article>").addClass("tweet");
  var $header = $("<header>");
  var $name = $("<span>").addClass("name");
  var $handler = $("<span>").addClass("handler");
  var $tweetMessage = $("<p>");
  var $footer = $("<footer>");

  $name.append(tweetData["user"]["name"]);
  $handler.append(tweetData["user"]["handle"]);
  $header.append("<img src=\"" + tweetData["user"]["avatars"]["small"] + "\">");
  $header.append($name);
  $header.append($handler);
  $tweetMessage.text(tweetData["content"]["text"]);
  $footer.append(new Date(tweetData["created_at"]));
  $footer.append("<i class=\"fas fa-flag\"></i>");
  $footer.append("<i class=\"fas fa-retweet\"></i>");
  $footer.append("<i class=\"fas fa-heart\"></i>");
  $tweet.append($header);
  $tweet.append($tweetMessage);
  $tweet.append($footer);

  return $tweet;
}

function renderTweets(tweets) {
  for (let tweet of tweets) {
    $("#tweets").prepend(createTweetElement(tweet));
  }
}

$(document).ready(function() {
  $.get("/tweets", function(data) {renderTweets(data)});

  $("section.new-tweet").slideUp();

  $("button.compose").click(function() {
      $("section.new-tweet").slideToggle(function() {
        $("#tweet-message").select();
      });
  })


  $("form").on("submit", function(event) {
    event.preventDefault();

    if ($("#tweet-message").val() === "") {
      alert("ENTER SOMETHING BEFORE TWEET!!!");
    } else if ($(".counter").html() < 0) {

      alert("TOO MANY WORDS!!!");
    } else {
      var value = $("#tweet-message").val();

      $.ajax({
        type: "POST",
        url: "/tweets",
        data: {
          text: value
        }
      });

      $.get("/tweets", function(data) {$("#tweets").prepend(createTweetElement(data[data.length - 1]))});
    }

  });
});

