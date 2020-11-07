var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var startGame = false;

var level = 0;

$("body").keydown(function() {
    if (startGame === false) {
        nextSequence();
        userClickedPattern = [];
        startGame = true;
}})

$(".btn").on("click", function() {  //add click event listener to btn class
    var userChosenColor = $(this).attr("id"); //assign btn id to userChosenColor
    userClickedPattern.push(userChosenColor);
    $("#" + userChosenColor).fadeTo(100, 0.3, function() { 
        $(this).fadeTo(300, 1.0); });
    playSound(userChosenColor);
    if (gamePattern.length === userClickedPattern.length) {
        checkAnswer(gamePattern, userClickedPattern);
}});


function nextSequence() {
    var randomNumber = Math.floor((Math.random()) *4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeTo(100, 0.3, function() { 
        $(this).fadeTo(300, 1.0); }); //flash the random button
    playSound(randomChosenColor);  //add sound when random button flashes
    ++level;
    $("#level-title").text("Level " + level);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function checkAnswer(a,b) {
    for (var i = 0; i <= a.length; ++i) {
        if (a[i] !== b[i]) {
            return gameOver();
        }
    } 
    userClickedPattern = [];
    setTimeout(function() {nextSequence(); }, 2000);
}

function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over - press any key to restart");
    startOver();
}

function startOver() {
    gamePattern = [];
    startGame = false;
    level = 0;
}