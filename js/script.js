const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia"; //global variable that will take place for the api.
const guessedLetters = [];  // This array will contain all the letters the player guesses. 

// Display our symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        /* console.log(letter); */
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    // Empty message paragraph
    message.innerText = "";
    // Let's grab what was entered in the input
    const guess = letterInput.value;
    // Let's make sure that it is a single letter
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        // We've got a letter! Let's guess!
        makeGuess(guess);
    }
    letterInput.value = "";
});

const validateInput = function (input) { //This function's purpose is to validate the player's input.
    const acceptedLetter = /[a-zA-Z]/; //regular expression to ensure the player inputs a letter!
    if (input.length === 0) {
        // Is the input empty?
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        // Did you type more than one letter?
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        // Did you type a number, a special character or some other non letter thing?
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        // We finally got a single letter, omg yay
        return input;
    }
};

const makeGuess = function (guess) { //Create a Function to Capture Input
    guess = guess.toUpperCase(); //JavaScript is case sensitive, so it sees uppercase and lowercase letters as different characters. The easiest way to handle case-sensitivity is to convert all letters to one casing. We recommend converting your letter parameter to uppercase. 
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter, silly. Try again.";
    } else {
        guessedLetters.push(guess);
        //console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    // Clear the list first
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
      const li = document.createElement("li");
      li.innerText = letter;
      guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) { //this function will replace the circle symbols with the correct letters guessed
    const wordUpper = word.toUpperCase(); //change the word variable to uppercase
    const wordArray = wordUpper.split(""); //split the word string into a array so that the letter can appear in the guessesdLetter array
    //console.log(wordArray)
    const revealWord = []; //new array with the updated characters
    for (const letter of wordArray) { //to check if the wordArray contains any letter from the guessedLetter array
      if (guessedLetters.includes(letter)) { //if does contains any of the letters, update the circle symbol with the correct letter
        revealWord.push(letter.toUpperCase()); //You'll want to create a new array with the updated characters and then use join() to update the empty paragraph where the word in progress will appear.
      } else {
        revealWord.push("●");
      }
    }
    // console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    checkIfWon();
  };
  
  const checkIfWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) { // Begin by verifying if their word in progress matches the word they should guess.
      message.classList.add("win");
      message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
  };