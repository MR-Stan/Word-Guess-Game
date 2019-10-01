// last key pressed is showing up on next round
// remove commas from letters guessed and increase space between 
// no repeat until all songs have been picked - define artists array in initialze, acomputerGuess is chosen remove the item from artists array
// need to print uppercase guesses

// ******************************************************************* GLOBAL VARIABLES ***************************************************************** //

const guessesRemainingText = document.getElementById("guessesRemaining");   // number of guesses remaining    

const guessText = document.getElementById("guesses");       // letters already guessed

const wordText = document.getElementById("word");           // current unknown word w/ blanks and letters guessed

const artImage = document.getElementById("image");          // artists image

const outcomeText = document.getElementById("outcome");     // initially game instructions, then win / lose message based on outcome

const spotify = document.getElementById("spotify");         // embedded spotify player

// ------------------------------------------------------------------------------------------------------------------------------------------------------ // 

// ******************************************************************* ARTIST OBJECTS ******************************************************************* //

var gameObject = {

    art1 : {
        name: "Deep Purple",
        title: "Smoke on the Water", 
        audio: '<iframe src="https://open.spotify.com/embed/track/5SAUIWdZ04OxYfJFDchC7S" width="300" height="600" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
        image: "<img src='assets/images/artists/deepPurple.jpg' alt='Deep Purple album cover'>"
    },

    art2 : { 
        name: "Queen", 
        title: "Bohemian Rhapsody", 
        audio: '<iframe src="https://open.spotify.com/embed/track/6l8GvAyoUZwWDgF1e4822w" width="300" height="600" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
        image: "<img src='assets/images/artists/queen.jpg' alt='Queen album cover'>"
    },

    art3 : { 
        name: "Pink Floyd", 
        title: "Comfortably Numb",
        audio: '<iframe src="https://open.spotify.com/embed/track/5HNCy40Ni5BZJFw1TKzRsC" width="300" height="600" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
        image: "<img src='assets/images/artists/pinkFloyd.png' alt='Pink Floyd album cover'>"
    },

    art4 : { 
        name: "Led Zeppelin", 
        title: "Black Dog", 
        audio: '<iframe src="https://open.spotify.com/embed/track/3qT4bUD1MaWpGrTwcvguhb" width="300" height="600" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
        image: "<img src='assets/images/artists/ledZeppelin.jpg' alt='Led Zeppelin album cover'>"
    },

    art5: { 
        name: "Eric Clapton", 
        title: "Layla", 
        audio: '<iframe src="https://open.spotify.com/embed/track/3gce83TvahSnFHFtCqbe4R" width="300" height="600" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>', 
        image: "<img src='assets/images/artists/ericClapton.jpg' alt='Eric Clapton album cover'>"
    },

    art6: { 
        name: "The Who", 
        title: "Baba O'Riley", 
        audio: '<iframe src="https://open.spotify.com/embed/track/3qiyyUfYe7CRYLucrPmulD" width="300" height="600" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>', 
        image: "<img src='assets/images/artists/theWho.jpg' alt='The Who album cover'>"
    },

    art7: { 
        name: "Santana", 
        title: "Black Magic Woman", 
        audio: '<iframe src="https://open.spotify.com/embed/track/4YMQXzscifAREG0a7KNGhB" width="300" height="600" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>', 
        image: "<img src='assets/images/artists/santana.jpg' alt='Santana album cover'>"
    },

    art8: { 
        name: "Lynyrd Skynyrd", 
        title: "Sweet Home Alabama", 
        audio: '<iframe src="https://open.spotify.com/embed/track/7e89621JPkKaeDSTQ3avtg" width="300" height="600" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>', 
        image: "<img src='assets/images/artists/lynyrdSkynyrd.jpg' alt='Lynyrd Skynyrd album cover'>"
    },

    art9: { 
        name: "Aerosmith", 
        title: "Dream On", 
        audio: '<iframe src="https://open.spotify.com/embed/track/5MxNLUsfh7uzROypsoO5qe" width="300" height="600" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
        image: "<img src='assets/images/artists/aerosmith.jpg' alt='Aerosmith album cover'>"
    },

    art10 : { 
        name: "The Knack", 
        title: "My Sharona", 
        audio: '<iframe src="https://open.spotify.com/embed/track/1HOMkjp0nHMaTnfAkslCQj" width="300" height="600" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>', 
        image: "<img src='assets/images/artists/theKnack.jpg' alt='The Knack album cover'>"
    },

    art11 : { 
        name: "Elton John", 
        title: "Tiny Dancer",
        audio: '<iframe src="https://open.spotify.com/embed/track/2TVxnKdb3tqe1nhQWwwZCO" width="300" height="600" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>', 
        image: "<img src='assets/images/artists/eltonJohn.jpg' alt='Elton John album cover'>"
    },

    art12 : { 
        name: "Wild Cherry", 
        title: "Play That Funky Music", 
        audio: '<iframe src="https://open.spotify.com/embed/track/5uuJruktM9fMdN9Va0DUMl" width="300" height="600" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>', 
        image: "<img src='assets/images/artists/wildCherry.jpg' alt='Wild Cherry album cover'>"
    },

// ------------------------------------------------------------------------------------------------------------------------------------------------------ //
    computerGuess : "",
    blankWord : [],
    guesses : [],
    userGuess : "",
    guessesRemaining: "",

    // initializes game
    initialize : function() {
        
        // display directions
        this.reset();
        // guessText.innerText = "";
    },


    reset : function () {
        var artists = [this.art1, this.art2, this.art3, this.art4, this.art5, this.art6, this.art7, this.art8, this.art9, this.art10, this.art11, this.art12];
        computerGuess = (artists[Math.floor(Math.random() * artists.length)]);
        computerGuess.name = computerGuess.name.toLowerCase();
        blankWord = [];
        this.guesses = [];

        // determine the number of characters in computerGuess
        for (var i = 0; i < computerGuess.name.length; i++) {
            blankWord.push("_");
        }
          // check for space in the artists name and converts the space to '|'
        if (computerGuess.name.indexOf(" ") !== -1) {
            var ind = computerGuess.name.indexOf(" "); 
            blankWord.splice(ind, 1, " | ");

        }
        var word = blankWord.toString();
        word = word.replace(/,/g, " ");
        wordText.innerText = word;
        guessText.innerText = "";
        guessesRemaining = parseInt(computerGuess.name.length - 2); 
        guessesRemainingText.innerText = guessesRemaining;
    },
    
    // increase win counter by 1
    winCount : function() {
        let winCounter = 0;
        return function() {
            winCounter += 1; 
            const winText = document.getElementById("wins");  
            winText.innerText = winCounter;
            return winCounter;
        }
    }(),

    win : function() {
        var image = computerGuess.image;
        
        artImage.innerHTML = image;
        // play song
        spotify.innerHTML = computerGuess.audio;
        // capitalize computerGuess.name
        outcomeText.innerHTML =  "Congratulations you correctly guessed " + computerGuess.name;
        this.winCount();
        this.reset();
    },


    main : function() {
        var alphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

        // verify that userGuess is a letter
        if (alphabetArray.includes(this.userGuess)) {     
            
            // check if userGuess is not a duplicate
            if (! this.guesses.includes(this.userGuess)) {        
                // if not duplicate, add to array of letters guessed
                this.guesses.push(this.userGuess);       
                guessText.innerText = this.guesses;
                // if on final guess the word does not include the userGuess then lose
                if (guessesRemaining === 1 && ! computerGuess.name.includes(this.userGuess)) {
                    alert("'" + this.userGuess + "' is incorrect. You're out of guesses, you lose!");
                    this.reset();
                    }
                    // else if a letter matches a letter(s) in artist name
                else if (computerGuess.name.includes(this.userGuess)) {
                    // the indecomputerGuess.name at which userGuess is found
                    for (var j = 0; j < (computerGuess.name.length); j++) {
                        if (computerGuess.name[j] === this.userGuess) {
                            blankWord[j] = this.userGuess; // used twice can do function
                            word = blankWord.toString();
                            word = word.replace(/,/g, " ");
                            wordText.innerText = word;   
                            if ( ! blankWord.includes("_")) {      
                                this.win();                
                            }
                        }
                    }
                }
                // else not last guess but userGuess doesn't match the word
                else {
                    guessesRemaining--;
                    guessesRemainingText.innerText = guessesRemaining;
                }
            }   
            // if duplicate entry
            else {
                alert("You've already used '" + this.userGuess + "'. Try again.");
            }
        } 
        // if userGuess is not a letter
        else {      
            let alphaString = alphabetArray.toString();
            alphaString = alphaString.replace(/,/g, "  ");
            alert("'" + event.key + "' is not a letter. Press one of these:  \n" + alphaString);
        }
    }
}


// Initiate game when window loads
window.onload = function () {
    gameObject.initialize();
}

// Game loop
document.onkeyup = function (event) { 
    gameObject.userGuess = event.key.toLowerCase();
    gameObject.main();
}

