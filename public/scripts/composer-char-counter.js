$(document).ready(function () {


  $('#tweet-text').on("input", function() {
    const $textarea = $(this);
    const text = $textarea.val();
    const remaining = 140 - text.length;
    const form = $textarea.closest('form');
    const counter = form.find('.counter');
    counter.text(remaining);
    
    if (remaining < 0) {
      counter.addClass('red') 
    } else {
      counter.removeClass('red')
    }

  });
});