var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


$(document).one("keydown", function (e) {
    if (e.key === "a") {
        nextSequence();
    }
});

function nextSequence() {
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// Listener addition and button flashing


$(".btn").click(function (event) {

    var userChosenColour = event.target.getAttribute("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);


    checkAnswer(userClickedPattern.length - 1);

});


function playSound(color) {
    var sound = new Audio("./sounds/" + color + ".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {


    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Good");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence()
            }, 1000);
            userClickedPattern = [];
        }
    } else if (userClickedPattern[currentLevel] != gamePattern[currentLevel]) {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key To Restart");
        $(document).keydown(function (event) {
            startOver();
        })
    }

}

function startOver() {
    gamePattern = [];
    level = 0;
    userClickedPattern = [];
    nextSequence();
}