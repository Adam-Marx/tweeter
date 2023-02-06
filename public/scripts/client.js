/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready( function () {

  // HIDE ERROR MESSAGE ELEMENT
  $('#error-message').hide();

  // DOUBLE ARROW SLIDES DOWN / UP NEW TWEET FORM
  $('.double-arrows').on('click', function() {
    $('.new-tweet').slideToggle();
    $('#tweet-text').focus();
    });

  // WHAT ARE YOU HUMMING ABOUT?
  $('#tweet-text').on('focus', function() {
    if (!$(this).hasClass('typing')) {
      $('#humming').hide();
      $(this).addClass('typing');
    }
  });
  
  $('#tweet-text').on('blur', function() {
    if ($(this).val().length === 0) {
      $('#humming').show();
      $(this).removeClass('typing');
    }
  });

  //ESCAPE MALICIOUS JAVASCRIPT
  const escape = function(str) {
    let span = document.createElement("span");
    span.appendChild(document.createTextNode(str));
    return span.innerHTML;
  };

   const createTweetElement = (tweet) => {
    const timeAgo = timeago.format(new Date(tweet.created_at));
    const $tweet = $(`
    <article id="tweet">

    <header class="tweets-headings">
      <div id="name-avatar">
        <img src="${tweet.user.avatars}"></img> 
        <h4>${tweet.user.name}</h4>
      </div>
      <div id="username">
      <h4>${tweet.user.handle}</h4>
      </div>
    </header>

    <div class="tweet-content">
    <span>${escape(tweet.content.text)}</span>
    </div>

    <footer>
      <span id="date">${timeAgo}</span>
      <span id="icons"><i class="fa-solid fa-flag"></i> <i class="fa-solid fa-retweet"></i> <i class="fa-solid fa-heart"></i></span>
    </footer>

    </article>
    `);

    return $tweet;
  };

  
  const renderTweets = (tweets) => {
      $('#tweets-container').empty();
      for (const tweet of tweets) {
        const $returnValue = createTweetElement(tweet);
        $('#tweets-container').prepend($returnValue);
      }
    };

  const loadTweets = () => {

    $.ajax({
      url: '/tweets',
      type: "GET",
      dataType: 'json',
    })
    .then(function(tweets) {
      console.log('Success:', tweets);
      renderTweets(tweets);
    })
    .catch(function(err) {
      console.error('Error fetching tweets:', err);
    });
  };

 
  //POST TWEET

  $('#new-tweet-form').submit(function(e) {
    e.preventDefault();
    const max = 140;
    const text = $('#tweet-text').val();

    $('#error-message').slideUp('slow');

   

    const $errorSymbol = $('<i class="fa fa-exclamation-triangle"></i>');

    if (!text) {
      return $('#error-message').slideDown('slow').html(`${$errorSymbol[0].outerHTML} Please do not leave this field empty.`).show();
    } else if (text.length > max) {
      return $('#error-message').slideDown('slow').html(`${$errorSymbol[0].outerHTML} Your tweet has exceeded the character limit of ${max}. Please shorten your tweet.`).show();
    } else {
      $('#error-message').slideUp('slow');
    }


    const tweetData = $(this).serialize();

    $.ajax({
      url: '/tweets',
      type: "POST",
      data: tweetData
    })
    .then(function(res) {
      console.log('Tweet sent successfully:', res);
      loadTweets();
      $('#tweet-text').val('');
      $('#humming').show();
      $('#tweet-text').removeClass('typing');
    })
    .catch(function(err) {
      console.error('Error sending tweet to server:', err);
    });  
  });

  loadTweets();

});



