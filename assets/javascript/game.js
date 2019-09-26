// blanks are displayed as " " instead of "|"
// initial song music is played
// on win -> song changes to artist, picture updates, song title and artist are displayed, game resets
// last key pressed is showing up on next round
// remove commas from letters guessed and increase space between -- or do board like the fridge example
// no repeat until all songs have been picked
// function to convert array to string and uppercase it. 
// need to print uppercase guesses
// add images to object


// ********************************************************************** DOCUMENT OBJECTS *************************************************************** //

    const guessNumText = document.getElementById("guessnum");   // number of guesses remaining    

    const guessText = document.getElementById("guesses");       // letters already guessed

    const bandText = document.getElementById("band");           // current unknown word w/ blanks and letters guessed

    const artImage = document.getElementById("image");

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

    var image;

// ------------------------------------------------------------------------------------------------------------------------------------------------------ //

// ********************************************************************** FIXED - are they really? ARRAYS ****************************************************************** //

    // array of the alphabet used to validate userGuess
    const alphaArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    // ****** ARTISTS ****** //

    const art1 = {
        name: "Deep Purple", 
        song: "Smoke on the Water", 
        audio: "", 
        img: "<img src='assets/images/artists/deepPurple.jpg' alt='Deep Purple album cover'>"
};

    const art2 = {
        name: "Queen", 
        song: "Bohemian Rhapsody", 
        audio: "", 
        img: "<img src='assets/images/artists/queen.jpg' alt='Queen album cover'>"
};
    
    const art3 = {
        name: "Pink Floyd", 
        song: "Comfortably Numb", 
        audio: "", 
        img: "<img src='assets/images/artists/pinkFloyd.png' alt='Pink Floyd album cover'>"
};

    const art4 = {
        name: "Led Zeppelin", 
        song: "Black Dog", 
        audio: "", 
        img: "<img src='assets/images/artists/ledZeppelin.jpg' alt='Led Zeppelin album cover'>"
};

    const art5 = {
        name: "Eric Clapton", 
        song: "Layla", 
        audio: "", 
        img: "<img src='assets/images/artists/ericClapton.jpg' alt='Eric Clapton album cover'>"
};

    const art6 = {
        name: "The Who", 
        song: "Baba O'Riley", 
        audio: "", 
        img: "<img src='assets/images/artists/theWho.jpg' alt='The Who album cover'>"
};

    const art7 = {
        name: "Santana", 
        song: "Black Magic Woman", 
        audio: "", 
        img: "<img src='assets/images/artists/santana.jpg' alt='Santana album cover'>"
};

    const art8 = {
        name: "Lynyrd Skynyrd", 
        song: "Sweet Home Alabama", 
        audio: "", 
        img: "<img src='assets/images/artists/lynyrdSkynyrd.jpg' alt='Lynyrd Skynyrd album cover'>"
};

    const art9 = {
        name: "Aerosmith", 
        song: "Dream On", 
        audio: "", 
        img: "<img src='assets/images/artists/aerosmith.jpg' alt='Aerosmith album cover'>"
};

    const art10 = {
        name: "The Knack", 
        song: "My Sharona", 
        audio: "", 
        img: "<img src='assets/images/artists/theKnack.jpg' alt='The Knack album cover'>"
};

    const art11 = {
        name: "Elton John", 
        song: "Tiny Dancer",
        audio: "", 
        img: "<img src='assets/images/artists/eltonJohn.jpg' alt='Elton John album cover'>"
};

    const art12 = {
        name: "Wild Cherry", 
        song: "Play That Funky Music", 
        audio: "", 
        img: "<img src='assets/images/artists/wildCherry.jpg' alt='Wild Cherry album cover'>"
};

    // array of artist objects
    const artists = [art1, art2, art3, art4, art5, art6, art7, art8, art9, art10, art11, art12];

// ------------------------------------------------------------------------------------------------------------------------------------------------------ //

// ********************************************************************** FUNCTIONS ********************************************************************* //

    // should be able to place these where they go and exclude this function
    var print = function() {
        let guessesStr = guesses.toString();
        guessesStr = guessesStr.replace(/,/g, " ");
        guessNumText.innerText = guessesRem;
        guessText.innerText = guesses;
        bandText.innerText = band;
    }

    // should be able to place these where they go and exclude this function
    var wordUp = function() {
        let x = charNum.toString();
        band = x.replace(/,/g, " ");
        print();
    }

    // initializes game
    var initialize = function() {
        computerGuess = artists[Math.floor(Math.random() * artists.length)];
        image = computerGuess.img;
        cgN = computerGuess.name.toLowerCase();
        guessesRem = parseInt(cgN.length - 2); // determining # of guesses 
        charNum = [];
        guesses = [];
        print();
        // determine the number of characters in computerGuess
        for (var i = 0; i < cgN.length; i++) {
            charNum.push("_");
        }
        // check for space in the artists name and converts the space to | - ***need to figure out how to keep the space instead of |
        if (cgN.indexOf(" ") !== -1) {
            ind = cgN.indexOf(" "); 
            charNum.splice(ind, 1, " | ");
            wordUp();

        }
        else {
            wordUp();
        }
    }

    // increase win counter by 1
    var winCount = function() {
        let winCounter = 0;
        return function() {
            winCounter += 1; 
            const winText = document.getElementById("wins");  
            winText.innerText = winCounter;
            return winCounter;
        }
    }();

    // evaluate if the user has won or not
    var winEval = function() {
        if ( ! charNum.includes("_" || "|")) {
            console.log("win");
            win(); // will call win() instead
        }
        else {
            console.log("keep going");
        }
    }

    var win = function() {
        // put pic in html
        artImage.innerHTML = image;
        // play song
        // display artist name
        // display song name
        winCount();
        initialize();
    }

// ------------------------------------------------------------------------------------------------------------------------------------------------------ //


// ********************************************************************** GAME LOOP ********************************************************************* //

initialize()

// when a key is pressed
document.onkeyup = function (event) {
    userGuess = event.key.toLowerCase(); 

    // verifying input is a letter
    if (alphaArr.includes(userGuess)) {

        // verifying input is not a duplicate
        if (! guesses.includes(userGuess)) {
        guesses.push(userGuess); // keeping track of what letters have been used

            // final guess doesn't match
            if (guessesRem === 1 && ! cgN.includes(userGuess)) {
                alert("'" + userGuess + "' is incorrect. You're out of guesses, you lose!");
                initialize();
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
        let alphaString = alphaArr.toString();
        alphaString = alphaString.replace(/,/g, " ");
        alert("'" + event.key + "' is not a letter. Press one of these: " + alphaArr);
    }
}

// user computerGuess.name when win - this keeps capitalization
