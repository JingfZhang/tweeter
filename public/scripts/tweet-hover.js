$(document).ready(function() {
  $("#tweets article.tweet").on("mouseenter", function() {
    $(this).addClass("hover");
  })

  $("article.tweet").on("mouseleave", function() {
    $(this).removeClass("hover");
  })

})