// blanks are displayed as " " instead of "|"
// initial song music is played
// on win -> song changes to artist, picture updates, song title and artist are displayed, game resets
// last key pressed is showing up on next round
// remove commas from letters guessed and increase space between -- or do board like the fridge example
// no repeat until all songs have been picked - define artists array in initialze, after computerGuess is chosen remove the item from artists array
// function to convert array to string and uppercase it. 
// need to print uppercase guesses
// add music to object
// get rid of nested functions

// ******************************************************************* GLOBAL VARIABLES ***************************************************************** //

const guessNumText = document.getElementById("guessnum");   // number of guesses remaining    

const guessText = document.getElementById("guesses");       // letters already guessed

const bandText = document.getElementById("band");           // current unknown word w/ blanks and letters guessed

const artImage = document.getElementById("image");          // artists image

// ------------------------------------------------------------------------------------------------------------------------------------------------------ // 

// ******************************************************************* ARTIST OBJECTS ******************************************************************* //

const art1 = {
    name: "Deep Purple",
    title: "Smoke on the Water", 
    audio: "",
    image: "<img src='assets/images/artists/deepPurple.jpg' alt='Deep Purple album cover'>"
};

const art2 = { 
    name: "Queen", 
    title: "Bohemian Rhapsody", 
    audio: "",
    image: "<img src='assets/images/artists/queen.jpg' alt='Queen album cover'>"
};

const art3 = { 
    name: "Pink Floyd", 
    title: "Comfortably Numb",
    audio: "",
    image: "<img src='assets/images/artists/pinkFloyd.png' alt='Pink Floyd album cover'>"
};

const art4 = { 
    name: "Led Zeppelin", 
    title: "Black Dog", 
    audio: "",
    image: "<img src='assets/images/artists/ledZeppelin.jpg' alt='Led Zeppelin album cover'>"
};

const art5 = { 
    name: "Eric Clapton", 
    title: "Layla", 
    audio: "", 
    image: "<img src='assets/images/artists/ericClapton.jpg' alt='Eric Clapton album cover'>"
};

const art6 = { 
    name: "The Who", 
    title: "Baba O'Riley", 
    audio: "", 
    image: "<img src='assets/images/artists/theWho.jpg' alt='The Who album cover'>"
};

const art7 = { 
    name: "Santana", 
    title: "Black Magic Woman", 
    audio: "", 
    image: "<img src='assets/images/artists/santana.jpg' alt='Santana album cover'>"
};

const art8 = { 
    name: "Lynyrd Skynyrd", 
    title: "Sweet Home Alabama", 
    audio: "", 
    image: "<img src='assets/images/artists/lynyrdSkynyrd.jpg' alt='Lynyrd Skynyrd album cover'>"
};

const art9 = { 
    name: "Aerosmith", 
    title: "Dream On", 
    audio: "",
    image: "<img src='assets/images/artists/aerosmith.jpg' alt='Aerosmith album cover'>"
};

const art10 = { 
    name: "The Knack", 
    title: "My Sharona", 
    audio: "", 
    image: "<img src='assets/images/artists/theKnack.jpg' alt='The Knack album cover'>"
};

const art11 = { 
    name: "Elton John", 
    title: "Tiny Dancer",
    audio: "", 
    image: "<img src='assets/images/artists/eltonJohn.jpg' alt='Elton John album cover'>"
};

const art12 = { 
    name: "Wild Cherry", 
    title: "Play That Funky Music", 
    audio: "", 
    image: "<img src='assets/images/artists/wildCherry.jpg' alt='Wild Cherry album cover'>"
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------ // 

// array of artist objects
const artists = [art1, art2, art3, art4, art5, art6, art7, art8, art9, art10, art11, art12];


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


// should be able to place these where they go and exclude this function

var print = function() { // rename arrayToString
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
    image = computerGuess.image;
    cgN = computerGuess.name.toLowerCase();
    guessesRem = parseInt(cgN.length - 2); // determining # of guesses 
    charNum = [];
    guesses = [];
    print();
    // determine the number of characters in computerGuess
    for (var i = 0; i < cgN.length; i++) {
        charNum.push("_");
    }
    // check for space in the artists name and converts the space to | - ***need to figure out how to keep the space instead of |********************************
    if (cgN.indexOf(" ") !== -1) {
        ind = cgN.indexOf(" "); 
        charNum.splice(ind, 1, " | ");
        wordUp();

    }
    else {
        wordUp();
    }
}

var finalGuess = function() {
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
    if ( ! charNum.includes("_")) {      
        win(); 
    }
    else {
        console.log("keep going"); // if you didn't win what's next
    }
}

var win = function() {
    artImage.innerHTML = image;
    // user computerGuess.name when win - this keeps capitalization
    // play song
    // display artist name
    // display song name
    winCount();
    initialize();
}



// ------------------------------------------------------------------------------------------------------------------------------------------------------ //


// ********************************************************************** GAME LOOP ********************************************************************* //

initialize()

// array of the alphabet used to validate userGuess
const alphaArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


document.onkeyup = function (event) {       // when a key is pressed
userGuess = event.key.toLowerCase();        // userGuess is set to the pressed key

if (alphaArr.includes(userGuess)) {     // verify userGuess is a letter
    
    if (! guesses.includes(userGuess)) {        // verify input is not a duplicate
        guesses.push(userGuess);        // add userGuess to guesses array to keep track of what letters have been used
        finalGuess();
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


