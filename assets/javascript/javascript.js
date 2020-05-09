let topics = ['Happy', 'Sad', 'Anxious', 'Sleepy', 'Relaxed', 'Angry', 'Hysterical', 'Bleh', 'Furious', 'Confused']
//creating buttons//
function createButtons() {
    $("#vg-btns").empty()

    for (let i = 0; i < topics.length; i++) {
        let gameBtn = $("<button>")
        gameBtn.addClass("btn btn-dark")
        gameBtn.text(topics[i])
        gameBtn.attr("data-game", topics[i])
        gameBtn.on("click", grabGif)
        $("#vg-btns").append(gameBtn)
    }
}

createButtons();

$("#submitBtn").on("click", function(event) {
    event.preventDefault();
    let videoGame = $("#vg-input").val().trim();
    topics.push(videoGame);
    createButtons();
})

//ajax on click//
function grabGif() {

    $("#game-gifs").empty()

    let game = $(this).attr("data-game")
    console.log(game)
    let queryURL = "https://api.giphy.com/v1/gifs/search?limit=10&q=" + game + "&api_key=iR1jPERPw1oBVLsNHYX6W0mWSu0zfstS";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        let results = response.data
        for (let j = 0; j < results.length; j++) {
            let newDiv = $("<div>")
            let rating = results[j].rating
            let newP = $("<p>").text("rating: " + rating)
            let gameGif = $("<img>").attr("src", results[j].images.fixed_height_still.url)
            let animate = results[j].images.fixed_height.url
            let still = results[j].images.fixed_height_still.url
            gameGif.addClass("gifs")
            gameGif.attr("data-state", "still")
            gameGif.attr("data-still", still)
            gameGif.attr("data-animate", animate)
            newDiv.append(gameGif)
            newDiv.append(newP)
            $("#game-gifs").append(newDiv)
        }
    })
}


$("#game-gifs").on("click", ".gifs", function() {
    let display = $(this).attr("data-state")

    if (display === "still") {
        $(this).attr("src", $(this).attr("data-animate"))
        $(this).attr("data-state", "animate")
    } else {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still")
    }
})

