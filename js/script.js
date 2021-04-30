const message = document.querySelector(".message");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const guessedLetter = document.querySelector(".guessed-letter");
const letterInput = document.querySelector(".letter");
const guessButton = document.querySelector(".guess");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia"; //glabal variable that will hold place for the fecth api

const placeholder = function(word){
    const placeholderWord = [];
    for (const letter of word) {
        console.log(letter);
        placeholderWord.push("●");
    }
      wordInProgress.innerText = placeholderWord.join("");
};
placeholder(word);

guessButton.addEventListener("click", function(event){
    event.preventDefault();
    const userInput = letterInput.value
    console.log(userInput)
    letterInput.value = "";
});

