// artist is selected
// number of characters are determined
// blanks are displayed as " " instead of "_"
// initial song music is played
// on win -> song changes to artist, picture updates, song title and artist are displayed, game resets
// duplicate letters - how handle this logic

// ********************************************************************** DOCUMENT OBJECTS *************************************************************** //

    const guessNumText = document.getElementById("guessnum");   // number of guesses remaining

    const winText = document.getElementById("wins");            // wins

    const guessText = document.getElementById("guesses");       // letters already guessed

    const wordText = document.getElementById("word");           // current unknown word w/ blanks and letters guessed

// ------------------------------------------------------------------------------------------------------------------------------------------------------ //

// ********************************************************************** FIXED ARRAYS ****************************************************************** //

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

// ********************************************************************** GLOBAL VARIABLES ************************************************************** //

    var computerGuess;              // computer's artist selection

    var cgN;                        // reducing keystrokes    

    var guesses;                    // array of letters selected during current round

    var userWin;                    // total number of user wins

    var userGuess;                  // user's letter guess

    var guessesRem;                 // guesses remaining this round 

    var charNum;                    // array for number of characters of computerGuess

    var x;                          // updated charNum to string

    var word;                       // updated 'x' with spaces instead of commas

    var ind;                        // index of space in cgN (computerGuess.name)

    var letind;                     // index of letter in word that matches userGuess

// ------------------------------------------------------------------------------------------------------------------------------------------------------ //

// ********************************************************************** FUNCTIONS ********************************************************************* //

    // prints objects
    var print = function() {
        guessNumText.innerHTML = guessesRem;
        guessText.innerHTML = guesses;
        wordText.innerText = word;
        winText.innerText = userWin;
    }

    // convert to string and print
    var wordUp = function() {
        x = charNum.toString();
        word = x.replace(/,/g, " ");
        print();
    }

    // resets game
    var reset = function() {
        computerGuess = artists[Math.floor(Math.random() * artists.length)];
        guessesRem = cgN.length;
        guesses = [];
        print();
    }



// ------------------------------------------------------------------------------------------------------------------------------------------------------ //

// ********************************************************************** INITIALIZE ******************************************************************** //

    computerGuess = artists[Math.floor(Math.random() * artists.length)];
    cgN = computerGuess.name;
    guessesRem = cgN.length
    charNum = []
    guesses = []
    userWin = 0
    print();

// ------------------------------------------------------------------------------------------------------------------------------------------------------ //


// ********************************************************************** GAME LOOP ********************************************************************* //

if (true === true) {
    console.log(computerGuess);
    console.log(charNum);

}

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

// when a key is pressed
document.onkeyup = function (event) {
    userGuess = event.key.toLowerCase(); 

    // verifying input is a letter
    if (alphaarr.includes(userGuess)) {

        // verifying input is not a duplicate
        if (! guesses.includes(userGuess)) {
        guesses.push(userGuess); // keeping track of what letters have been used
        print();

            // final guess doesn't match
            if (guessesRem === 1 && ! cgN.includes(userGuess)) {
                alert("'" + userGuess + "' is incorrect. You're out of guesses, you lose!")
                reset();
            }

            // letter matches a letter(s) in artist name
            else if (cgN.includes(userGuess)) {
                console.log("got em coach");
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
        }
    }

    // entry is not a letter
    else {
        alert("Invalid entry. Enter a letter.");
    }
}



