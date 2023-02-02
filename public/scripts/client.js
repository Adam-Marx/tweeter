/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready( function () {

  // HIDE ERROR MESSAGE ELEMENT
  $('#error-message').hide();
  

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
      <h4>${tweet.user.name}</h4>
      <h4 id="username">${tweet.user.handle}</h4>
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

    $('#error-message').slideUp();

    if (!text) {
      return $('#error-message').slideDown('slow').text(`Please do not leave this field empty.`).show();
    } else if (text.length > max) {
      return $('#error-message').slideDown('slow').text(`Your tweet has exceeded the character limit of ${max}. Please shorten your tweet.`).show();
    } else {
      $('#error-message').slideUp();
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
    })
    .catch(function(err) {
      console.error('Error sending tweet to server:', err);
    });  
  });

  loadTweets();

});



