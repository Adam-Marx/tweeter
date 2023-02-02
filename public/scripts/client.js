/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready( function () {


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    const $returnValue = createTweetElement(tweet)
    $('#tweets-container').append($returnValue)
  }
};

const createTweetElement = (tweet) => {
  const currentDate = new Date();
  const tweetDate = new Date(tweet.created_at);
  const timeDiff = currentDate - tweetDate;
  const diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  let dateString;
  if (diffDays === 0) {
    dateString = 'Today';
  } else if (diffDays === 1) {
    dateString = 'Yesterday';
  } else {
    dateString = `${diffDays} days ago`;
  }

  const $tweet = $(`
  <article id="tweet">

  <header class="tweets-headings">
    <h4>${tweet.user.name}</h4>
    <h4 id="username">${tweet.user.handle}</h4>
  </header>

  <div class="tweet-content">
  <span>${tweet.content.text}</span>
  </div>

  <footer>
    <span id="date">${dateString}</span>
    <span id="icons"><i class="fa-solid fa-flag"></i> <i class="fa-solid fa-retweet"></i> <i class="fa-solid fa-heart"></i></span>
  </footer>

  </article>
  `);

  return $tweet;
};

renderTweets(data);

});