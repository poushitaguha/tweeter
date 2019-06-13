$(document).ready(function() {

// Function to count characters in the tweet.
// The code will update the character count dynamically and will turn the counter to red once the
// tweet length becomes more than 140 characters.
    $("textarea").on('input', function(event) {
        let tweetLength = $(this).val().length;
        // Check if tweet length becomes greater than 140
        let remLength = 140 - tweetLength;
        // Update the counter in tweeter page
        $(".counter").text(remLength);
        //Set the character counter to red if it goes below 0 by adding a class
        if (remLength < 0) {
            $(".counter").text(remLength).addClass("setRed");
        } else {
            $(".counter").text(remLength).removeClass("setRed");
        }        
    });

  });