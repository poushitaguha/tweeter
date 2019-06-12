/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// function buttonClick(ev) => ();

//  $button.addEventListener('click', buttonClick);

$(document).ready(function() {

// Fake data taken from tweets.json
const data = [
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

function createTweetElement(data) {

    let tweetImage = data.user.avatars.small;
    let username = data.user.name;
    let userHandle = data.user.handle;
    let tweetBody = data.content.text;
    let tweetCreateDate = data.created_at;
    let currentTime = Math.floor(Date.now());
    let daysElapsed = Math.floor((currentTime - tweetCreateDate) / (1000*60*60*24));

    let HTMLToAppend =  `
    <section class="tweets-container">
          <article class="tweet">
              <header>
                  <img src=${tweetImage} >
                  <span class="username">${username}</span>
                  <span class="handle">${userHandle}</span>
              </header>
              <div class="tweet-text">${tweetBody}</div>
              <footer>
                  <span class="days-display">${daysElapsed} day(s) ago</span>
                  <span class="icon">
                      <img src="/images/icons.png"
                  </span>
              </footer>
          </article>
      </section>
      `;

    return HTMLToAppend;
  }  

  function renderTweets(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container      
    data.forEach(function(item) {
        var $tweet = createTweetElement(item);
        console.log(item);
        $('.all-tweets').append($tweet);
    });
  }
  
  renderTweets(data);

});
