// dom
const guessNumText = document.getElementById("guessnum");
const winText = document.getElementById("wins");
const guessText = document.getElementById("guesses");

// computer variables
var computerChoices = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];

// user variables
var guesses = [];
var guessesRem = 9;
var userWin = 0;
var input;
var userGuess;

// resets game
var reset = function() {
    guessesRem = 9;
    guesses = [];
    guessNumText.innerHTML = guessesRem;
    guessText.innerHTML = guesses;
    computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];
}

// when a key is pressed
document.onkeyup = function (event) {
    input = event.key;
    userGuess = input.toLowerCase(); 

    // verifying input is letter
    if (computerChoices.includes(input)) {

        // verifying input is not a duplicate
        if (! guesses.includes(input)) {
        guesses.push(userGuess); // keeping track of what letters have been used
        guessText.innerHTML = guesses;

            // if final guess doesn't match
            if (guessesRem === 1 && userGuess !== computerGuess) {
                alert("'" + userGuess + "' is incorrect. You're out of guesses, you lose!")
                userLoss++;
                lossText.innerHTML = userLoss;

                // resetting game
                reset();
            }

            // if input matches
            else if (userGuess === computerGuess) {
                alert("'" + userGuess + "' was my letter. You WIN!");
                userWin++;
                winText.innerHTML = userWin;

                // resetting game
                reset();
            }

            // validation criteria met but guess doesn't match
            else {
                guessesRem--;
                guessNumText.innerHTML = guessesRem;
            }
        } 

        // if duplicate entry
        else {
            alert("You've already used '" + userGuess + "'. Try again.");
        }
    }

    // if entry is not a letter
    else {
        alert("Invalid entry. Enter a letter.");
    }
}


var artist1 = {name: "Deep Purple", song: "Smoke on the Water", audio: "", pic: ""};
var artist2 = {name: "Queen", song: "Bohemian Rhapsody", audio: "", pic: ""};
var artist3 = {name: "Pink Floyd", song: "Comfortably Numb", audio: "", pic: ""};
var artist4 = {name: "Led Zeppelin", song: "Black Dog", audio: "", pic: ""};
var artist5 = {name: "Eric Clapton", song: "Layla", audio: "", pic: ""};
var artist6 = {name: "The Who", song: "Baba O'Riley", audio: "", pic: ""};
var artist7 = {name: "Santana", song: "Black Magic Woman", audio: "", pic: ""};
var artist8 = {name: "Lynyrd Skynyrd", song: "Sweet Home Alabama", audio: "", pic: ""};
var artist9 = {name: "Aerosmith", song: "Dream On", audio: "", pic: ""};
var artist10 = {name: "The Knack", song: "My Sharona", audio: "", pic: ""};
var artist11 = {name: "Elton John", song: "Tiny Dancer", audio: "", pic: ""};
var artist12 = {name: "Wild Cherry", song: "Play That Funky Music", audio: "", pic: ""};

var artists = [artist1, artist2, artist3, artist4, artist5, artist6, artist7, artist8, artist9, artist10, artist11, artist12];