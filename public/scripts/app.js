/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//function that create each tweet
function createTweetElement(tweetData) {
  //create each necessary component for each tweet and add class when needed.
  var $tweet = $("<article>").addClass("tweet");
  var $header = $("<header>");
  var $name = $("<span>").addClass("name");
  var $handler = $("<span>").addClass("handler");
  var $tweetMessage = $("<p>");
  var $footer = $("<footer>");

  //Combine the content and components in order to form an entire "tweet".
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

//function that render each tweet using createTweetElement function
function renderTweets(tweets) {
  for (let tweet of tweets) {
    $("#tweets").prepend(createTweetElement(tweet));
  }
}

$(document).ready(function() {
  //renders the exsiting tweets when loading page
  $.get("/tweets", function(data) {renderTweets(data)});

  //slide up the compose section before user click "Compose" button.
  $("section.new-tweet").slideUp();

  //When "Compose" button is clicked toggle the compose section, and auto select textarea when compose section slides down.
  $("button.compose").click(function() {
      $("section.new-tweet").slideToggle(function() {
        $("#tweet-message").select();
      });
  })

  //What to do after clicking "Tweet" button.
  $("form").on("submit", function(event) {
    //stop page from refreshing after "Tweet" is clicked.
    event.preventDefault();

    //If nothing is entered to textarea show error message to remind user.
    if ($("#tweet-message").val() === "") {
      $(".new-tweet p.error-message").slideDown().text("Cannot tweet empty tweets!");

      $("#tweet-message").keydown(function() {
        $(".new-tweet p.error-message").slideUp();
      });

    // If more than 140 words is entered show error message to remind user.
    } else if ($(".counter").html() < 0) {
      $(".new-tweet p.error-message").slideDown().text("Cannot compose more than 140 words!");

      $("#tweet-message").keydown(function() {
        $(".new-tweet p.error-message").slideUp();
      });

    //If everything entered is valid update message to database and render new tweet to the page.
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

      document.getElementById("tweet-message").value = "";
    }

  });
});

