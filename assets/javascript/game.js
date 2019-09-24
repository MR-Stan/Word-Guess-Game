// artist is selected
// blanks are displayed as " " instead of "_"
// initial song music is played
// on win -> song changes to artist, picture updates, song title and artist are displayed, game resets
// duplicate letters - how handle this logic
// remove commas from letters guessed and increase space between -- or do board like the fridge example

// ********************************************************************** DOCUMENT OBJECTS *************************************************************** //

    const guessNumText = document.getElementById("guessnum");   // number of guesses remaining    

    const guessText = document.getElementById("guesses");       // letters already guessed

    const bandText = document.getElementById("band");           // current unknown word w/ blanks and letters guessed

// ------------------------------------------------------------------------------------------------------------------------------------------------------ //

// ********************************************************************** GLOBAL VARIABLES ************************************************************** //

    var computerGuess = [];              // computer's artist selection

    var cgN = "";                        // computerGuess.name    

    var guesses = [];                    // array of letters selected during current round

    var userGuess = "";                  // user's letter guess

    var guessesRem = 0;                 // guesses remaining this round 

    var charNum = [];                    // array for number of characters of computerGuess

    var band;                       // updated 'x' with spaces instead of commas

    var ind;                        // index of space in cgN (computerGuess.name)

    var letind;                     // index of letter in word that matches userGuess

// ------------------------------------------------------------------------------------------------------------------------------------------------------ //

// ********************************************************************** FIXED - are they really? ARRAYS ****************************************************************** //

    // array of the alphabet used to validate userGuess
    const alphaarr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    // *** ARTISTS *** //
    const art1 = {name: "Deep Purple", song: "Smoke on the Water", audio: "", pic: ""};
    const art2 = {name: "Queen", song: "Bohemian Rhapsody", audio: "", pic: ""};
    const art3 = {name: "Pink Floyd", song: "Comfortably Numb", audio: "", pic: ""};
    const art4 = {name: "Led Zeppelin", song: "Black Dog", audio: "", pic: ""};
    const art5 = {name: "Eric Clapton", song: "Layla", audio: "", pic: ""};
    const art6 = {name: "The Who", song: "Baba O'Riley", audio: "", pic: ""};
    const art7 = {name: "Santana", song: "Black Magic Woman", audio: "", pic: ""};
    const art8 = {name: "Lynyrd Skynyrd", song: "Sweet Home Alabama", audio: "", pic: ""};
    const art9 = {name: "Aerosmith", song: "Dream On", audio: "", pic: ""};
    const art10 = {name: "The Knack", song: "My Sharona", audio: "", pic: ""};
    const art11 = {name: "Elton John", song: "Tiny Dancer", audio: "", pic: ""};
    const art12 = {name: "Wild Cherry", song: "Play That Funky Music", audio: "", pic: ""};

    // array of artist objects
    const artists = [art1, art2, art3, art4, art5, art6, art7, art8, art9, art10, art11, art12];

// ------------------------------------------------------------------------------------------------------------------------------------------------------ //

// ********************************************************************** FUNCTIONS ********************************************************************* //

    // prints to document
    var print = function() {
        guessNumText.innerHTML = guessesRem;
        guessText.innerHTML = guesses;
        bandText.innerText = band;
        
    }

    // convert to string and print
    var wordUp = function() {
        let x = charNum.toString();
        band = x.replace(/,/g, " ");
        print();
    }

    // initializes game
    var initialize = function() {
        computerGuess = artists[Math.floor(Math.random() * artists.length)];
        cgN = computerGuess.name.toLowerCase();
        guessesRem = parseInt(cgN.length - (cgN.length*0.2)); // determining # of guesses - possible to set difficulty
        charNum = [];
        guesses = [];
        print();
        // determining the number of characters in computerGuess
        for (var i = 0; i < cgN.length; i++) {
            charNum.push("_");
        }
        // checks for space in the artists name and converts the space to | - ***need to figure out how to keep the space instead of |
        if (cgN.indexOf(" ") !== -1) {
            ind = cgN.indexOf(" "); 
            charNum.splice(ind, 1, " | ");
            wordUp();

        }
        else {
            wordUp();
        }
    }

    // resets game
    var reset = function() {
        computerGuess = artists[Math.floor(Math.random() * artists.length)];
        guessesRem = cgN.length;
        guesses = [];
        // determining the number of characters in computerGuess
        for (var i = 0; i < cgN.length; i++) {
            charNum.push("_");
        }
        // checks for space in the artists name and converts the space to | - ***need to figure out how to keep the space instead of |
        if (cgN.indexOf(" ") !== -1) {
            ind = cgN.indexOf(" "); 
            charNum.splice(ind, 1, " | ");
            wordUp();
        }
        else {
            wordUp();
        }
    }

    var win = function() {
        // put pic in html
        // play song
        // display artist name
        // display song name
        // winCount();

    }

    // increases win counter by 1
    var winCount = function() {
        let winCounter = 0;
        return function() {
            winCounter += 1; 
            const winText = document.getElementById("wins");  
            winText.innerText = winCounter;
            return winCounter;
        }
    }();

    // evaluates if the user has won or not
    var winEval = function() {
        if ( ! charNum.includes("_" || "|")) {
            console.log("win");
            winCount(); // will call win() instead
        }
        else {
            console.log("keep going");
        }
    }


// ------------------------------------------------------------------------------------------------------------------------------------------------------ //


// ********************************************************************** GAME LOOP ********************************************************************* //

initialize()

// when a key is pressed
document.onkeyup = function (event) {
    userGuess = event.key.toLowerCase(); 

    // verifying input is a letter
    if (alphaarr.includes(userGuess)) {

        // verifying input is not a duplicate
        if (! guesses.includes(userGuess)) {
        guesses.push(userGuess); // keeping track of what letters have been used

            // final guess doesn't match
            if (guessesRem === 1 && ! cgN.includes(userGuess)) {
                alert("'" + userGuess + "' is incorrect. You're out of guesses, you lose!")
            }

            // letter matches a letter(s) in artist name
            else if (cgN.includes(userGuess)) {
                // what cgn index is userguess found
                for (var j = 0; j < (cgN.length); j++) {
                    if (cgN[j] === userGuess) {
                        charNum[j] = userGuess;
                        wordUp();     
                        winEval();                 
                    }
                }
            }

            // validation criteria met but guess doesn't match
            else {
                guessesRem--;
                print();
            }

        } 

        // duplicate entry
        else {
            alert("You've already used '" + userGuess + "'. Try again.");
            print();
        }
    }

    // entry is not a letter
    else {
        alert("'" + event.key + "' is not a letter. Press one of these: " + alphaarr);
    }
}


// user computerGuess.name when win - this keeps capitalization
