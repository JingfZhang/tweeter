$(document).ready(function() {
  $(".tweet").on("mouseenter", function() {
    $(this).addClass("hover");
    // $(".tweet footer i").addClass("hover");
  })

  $(".tweet").on("mouseleave", function() {
    $(this).removeClass("hover");
    // $(".tweet footer i").removeClass("hover");
  })

})