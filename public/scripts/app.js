/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

    // Loads tweet function which executes a GET request to load tweets
    function loadTweets () {
        $.ajax({
            method: 'GET',
            url: "/tweets",
            dataType: 'JSON',
            success: data => {
                renderTweets(data);
            }        
        })
    };

    // Loops through tweets and calls createTweetElement for each tweet.
    // Then takes return value and appends it to the tweets container   
    function renderTweets(tweets) {   
        tweets.forEach(function(item) {
            var $tweet = createTweetElement(item);
            $('.all-tweets').prepend($tweet);
        });
    };

    // Function to handle cross-site scripting
    function escape(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };

    // Function to create the tweet container dynamically and return new tweet
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
                    <img src=${escape(tweetImage)} >
                    <span class="username">${escape(username)}</span>
                    <span class="handle">${escape(userHandle)}</span>
                </header>
                <div class="tweet-text">${escape(tweetBody)}</div>
                <footer>
                    <span class="days-display">${escape(daysElapsed)} day(s) ago</span>
                    <span class="icon">
                        <img src="/images/icons.png"
                    </span>
                </footer>
            </article>
        </section>
        `;

        return HTMLToAppend;
    }  

  // Code to toogle form
  $('#compose-button').on('click', function (event) {
    $('.new-tweet').slideToggle(100);
    $('textarea').select();
  })

  loadTweets();

    // Following code submits a request to the server using JQuery
    // It also checks for the validity of the tweet and performs the POST only if
    // the tweet is valid and length is greater than 140 characters.
    $("#tweetform").on('submit', function(event) {
        event.preventDefault();
        let tweet = $('textarea').val();
        let tweetLength = $('textarea').val().length;
        if (!tweet) {
            let $tweetError = "Tweet is empty";
            $('.error-message').text($tweetError);
            $('.error-message').slideDown();
        } else if (tweetLength > 140) {
            let $tweetTooLong = "Tweet is longer than 140 characters";
            $('.error-message').text($tweetTooLong);
            $('.error-message').slideDown();
        } else {
            $.ajax({
                method: 'POST',
                url: "/tweets",
                dataType: 'JSON',
                data: $(this).serialize(),
                success: function() {
                    loadTweets();
                    // Refresh text area and reset counter
                    $("textarea").val("");
                    $(".counter").text(140);
                }
            })
        }
    
    })

});
