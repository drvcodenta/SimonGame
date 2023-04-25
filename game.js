var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
// This would start the game as the User clicks any button on keyboard
    $(document).on("keypress",function(){
        if (!started){
            $("#level-title").text("LEVEL " + level);
            nextSequence();
            started = true;
        }
    });

// This would create a pattern in which the user clicked on the colors
$(".btn").click(function(){
    var UserChosenColor = $(this).attr("id");
    userClickedPattern.push(UserChosenColor);
    // console.log(userClickedPattern)
    playSound(UserChosenColor);
    animatePress(UserChosenColor);
    var index = (userClickedPattern.length) - 1;
    checkAnswer(index);
});

// A function that focuses on comparing the randomly choosen color and User's choosen color
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function (){nextSequence();},1000);
    }}
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(
            function(){
                $("body").removeClass("game-over");
            }, 200
        );
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        // Doubt: Why it executed startOver() right after i clicked a key while it should have done it without clicking?
    }
}

// A Function which would find a next random color and play its designated sound
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("LEVEL " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

// A function that would focus on playing the sound when a user clicks on the button
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// A function that would focus on creating animation to the clicked color
function animatePress(currentColor){
        $("#" + currentColor).addClass("pressed")
        setTimeout(function(){
            $("#" + currentColor).removeClass("pressed");
        }, 100)
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}