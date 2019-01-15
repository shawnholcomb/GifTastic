//qriginal array of shows
var topics = ["SpongeBob SquarePants", "Rugrats", "All That", "The Fairly OddParents", "Hey Arnold!", "The Ren & Stimpy Show", "Rocko's Modern Life", "Invader Zim", "The Angry Beavers", "Are You Afraid of the Dark"];

//function to render buttons for shows in original array and function call
function renderButtons() {
    
    $('#buttons').empty();
    
    topics.forEach(function (topic) {
        $('#buttons').append($('<button>')
        .attr('data-name', topic)
        .text(topic)
        .addClass("show-button"));
    });
};

renderButtons();

//function to allow users to add additional shows
$('#submit-button').on('click', function (event) {

    event.preventDefault();
    topics.push($('#user-input').val());

    renderButtons()

    $('#user-input').val('');
});

//query API and display info returned
function grabGifs() {

    $('#gif-images').empty();

    var tvShow = $(this).attr('data-name');
    var limit = 10;

    var url = "https://api.giphy.com/v1/gifs/search?q=" +
        tvShow + "&api_key=dc6zaTOxFJmzC&limit=" + limit;

    $.ajax(url)
        .then(function (results) {

            var result = results.data;

            result.forEach(function (response) {
                var showGifs = $('<div>').addClass("card");

                var rating = response.rating;
                var ratingUpper = rating.toUpperCase();

                showGifs.append('<p>Rating: ' + ratingUpper);

                var displayGif = $('<img>').attr('src', response.images.downsized_still.url)
                    .addClass("gifImage mx-auto")
                    .attr('data-state', "still")
                    .attr('data-still', response.images.downsized_still.url)
                    .attr('data-animate', response.images.original.url);

                    console.log(response);

                showGifs.append(displayGif);

                $('#gif-images').prepend(showGifs);

            });
        });
    };
    
    //click handler to play/pause gif
    $(document).on('click', '.gifImage', function() {
    
        var state = $(this).attr("data-state");
        console.log(this.src);
        console.log(state);
    
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"))
              .attr("data-state", "animate")
          } else {
            $(this).attr("src", $(this).attr("data-still"))
              .attr("data-state", "still")
          };
    });

    $(document).on('click', '.show-button', grabGifs);