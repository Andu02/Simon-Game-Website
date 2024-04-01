var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var gameRunning = false;
var clickCounter = 0;

// Gives next move
function nextSequence() {
    var randomNumber =  Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    makeSound(randomChosenColour);
    // console.log(gamePattern);
    $("#" + randomChosenColour).animate({opacity: "10%"}).animate({opacity: "100%"});
}

// Start / Restart game
$(document).keypress(function(e) {
    console.log(e);
    if(e.key === "a" && gameRunning === false) {
        restart();
        gameRunning = true;
        $("h1").text("Level 1");
        nextSequence();
    }
})

$(".btn").click(function(e){
    if(gameRunning == true) {
    userClickedPattern.push(e.target.id);
    makeSound(e.target.id);
    clickCounter++;
    // console.log(userClickedPattern);
    
    // Pressing animation
    $("#" + e.target.id).addClass("pressed");
    setTimeout(function() {
        $("#" + e.target.id).removeClass("pressed")
    }, 100);
    
    // Checking
    if(gamePattern[clickCounter-1] != userClickedPattern[clickCounter-1]) {
            $("h1").text("Game Over! Press A Key to Restart");
            $("body").addClass("game-over");
            makeSound("wrong");
            gameRunning = false;
    }

    if(clickCounter === level) {
        level++;
        $("h1").text("Level " + level);
        clickCounter = 0;
        userClickedPattern = [];
        nextSequence();
    }
}})

function restart() {
    gamePattern = [];
    userClickedPattern = [];
    level = 1;
    gameRunning = false;
    clickCounter = 0;
    $("body").removeClass("game-over");
}

function makeSound(name) {
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}