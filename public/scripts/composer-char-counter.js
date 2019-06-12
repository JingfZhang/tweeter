$(document).ready(function() {
  $('.counter').html(140);
  $('.new-tweet textarea').on("keyup", function() {
    var counter = 140 - ($(this).val().length);

    $('.counter').html(counter);

    if (counter < 0){
      $('.counter').addClass('over')
    } else {
      $('.counter').removeClass('over')
    }
  });
});


