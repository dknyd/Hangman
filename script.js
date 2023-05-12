// GAME VARIABLES

    // Constant
const buttonStart = document.querySelector(".buttonStart");
const welcomeScreen = document.querySelector(".welcomeScreen");
const gameScreen = document.querySelector(".gameScreen");
const alphabet = document.querySelector('.alphabet');
const numRows = 4;
const numCols = 7;
const abc = 'abcdefghijklmnopqrstu vwxyz';
const lettersToGuess = document.querySelector(".lettersToGuess");
const hangmanStatesIcon = document.querySelector('.hangmanStatesIcon');
const winScreen = document.querySelector(".winScreen");
const loseScreen = document.querySelector(".loseScreen");
const header = document.querySelector('.header');

    //Changing
let mistakes = 0;
let correctGuesses = 0;
let guess;
let dice;
let word;
let wordLength;
 
//FUNCTIONS
    // Hide element
function makeHidden(element) {
	element.classList.remove("visible");
	element.classList.add("hidden");
}

    // Show element
function makeVisible(element) {
	element.classList.add("visible");
	element.classList.remove("hidden");
}

    // Remove element's childNodes
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

    // Button creation for letters
function createButtons(){
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if ((col !== 0 || row !==3) && (col !== 6 || row !==3)){
                const index = row * numCols + col;
                const letter = abc.charAt(index);
                const div = document.createElement('div');
                div.classList.add("abcNode");
                div.innerHTML = letter;
                div.style.gridRow = `${row + 1}`;
                div.style.gridColumn = `${col + 1}`;
                alphabet.appendChild(div);
            }
            
        }
    }    
}

// Hide alphabet function
function hideAlphabet(){
	const alphabetDivs = document.querySelectorAll(".abcNode");
	for (let i = 0; i < alphabetDivs.length; i++){
		makeHidden(alphabetDivs[i])
	}
}


   // Getting random word from textfile
function importText(textFile) {
    let lineNum = Math.trunc(Math.random() * 854 - 1) + 1;
    let rawFile = new XMLHttpRequest();
    let allText = "";
    rawFile.open("GET", textFile, false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status === 200) {
            allText = rawFile.responseText;
            var lines = allText.split("\n");
            if (lineNum <= lines.length) {
                word = lines[lineNum - 1];
                console.log(`Word is ${word} in line number ${lineNum}`);
            }
        }
    }
    rawFile.send(null);
}

    // Start game function
function startGame(){
        // Get random word
    importText("Assets/words.txt");
    wordLength = word.length - 1;

        
    //    console.log(alphabet.childNodes[i].classList); 
    // }

        // Create underscores, as many as the length of the word 
    const underscoresArray = Array(wordLength).fill("_");
    const underscoresString = underscoresArray.join(" ");
    lettersToGuess.innerHTML = underscoresString;

        // Reset hangman source
    hangmanStatesIcon.src = `Assets/Hangman states/0.jpg`
    mistakes = 0;
    correctGuesses = 0;

        // Delete win / lose screens
    makeHidden(loseScreen);
}

    //Valid guess check
function checkIfValid(guess){
        // Wrong guess scenario
    if (!word.includes(guess) && mistakes < 10){
        mistakes ++;
        hangmanStatesIcon.src = `Assets/Hangman states/${mistakes}.jpg`;
     }  // Right guess scenario
     else if (word.includes(guess) && !lettersToGuess.innerHTML.includes(guess)){
    	let occurenceIndexes = [];
    	for (let j = 0; j < word.length; j++){
    		if (guess === word[j]){
    			occurenceIndexes.push(j);
    		}
    	// Changing underscores to valid letters
    	}
    	// console.log(`Letter ${guess} is contained in word ${word} ${numberOfLetterOccurence} times at indexes: ${occurenceIndexes}.`);
    	let letters = lettersToGuess.innerHTML.split(" ");
    	// console.log(letters)
    	for (let k = 0; k < occurenceIndexes.length; k++){
    	letters[occurenceIndexes[k]] = guess;
    	lettersToGuess.innerHTML = letters.join(" ");
    	correctGuesses ++;
    	// console.log(`Number of correct guesses: ${correctGuesses} from ${wordLength}`)
    	}
     }
}

    // Lose check
function checkIfLost(mistakes){
    if (mistakes === 10){
        setTimeout(function() {
            makeHidden(gameScreen);
            makeVisible(loseScreen);
            const gameOverText = document.createElement("div");
            const noButton = document.createElement("button");
            noButton.innerHTML = "NO";
            noButton.classList.add("noButton");
            const yesButton = document.createElement("button");
            yesButton.innerHTML = "YES";
            yesButton.classList.add("yesButton");
			hideAlphabet();
            gameOverText.innerHTML = `Game over! You failed to guess the word "${word}"😭 Do you want to play another game?`;	
			loseScreen.appendChild(gameOverText);
			
            loseScreen.appendChild(yesButton);
            loseScreen.appendChild(noButton);
            yesButton.addEventListener("click", function(){
				removeAllChildNodes(loseScreen);
				makeVisible(welcomeScreen);
                startGame();
            
            })
			noButton.addEventListener("click", function(){
				window.close();
			})
          }, 500); 
    }
}

    // Win check
function checkIfWin(){
    if (correctGuesses === wordLength){
        setTimeout(function() {
            makeHidden(gameScreen);
            makeVisible(winScreen);
            const winText = document.createElement("div");
            const noButton = document.createElement("button");
            noButton.innerHTML = "NO";
            noButton.classList.add("noButton");
            const yesButton = document.createElement("button");
            yesButton.innerHTML = "YES";
            yesButton.classList.add("yesButton");
			const alphabetDivs = document.querySelectorAll(".abcNode");
				for (let i = 0; i < alphabetDivs.length; i++){
					makeHidden(alphabetDivs[i])
				};
            winText.innerHTML = `You won!  You managed to guess the word "${word}"🤴 Do you want to play another game?`
            winScreen.appendChild(winText);
            winScreen.appendChild(yesButton);
            winScreen.appendChild(noButton);
            yesButton.addEventListener("click", function(){
				removeAllChildNodes(winScreen);
				makeVisible(welcomeScreen);
				hideAlphabet();
                startGame();
            })
			noButton.addEventListener("click", function(){
				window.close();
			})
        }, 500)
    }
}

// INITIALIZE GAME
    // Calling functions
createButtons();
startGame();

    // Buttons event listener
buttonStart.addEventListener("click", function() {
	// Make alphabet buttons all visible
   
	
    const alphabetDivs = document.querySelectorAll(".abcNode");
     for (let i = 0; i < alphabetDivs.length; i++){
       makeVisible(alphabetDivs[i]);
	 }
    makeHidden(welcomeScreen);
    makeVisible(gameScreen);
})
for (let i = 0; i < alphabet.childNodes.length; i++) {
	alphabet.childNodes[i].addEventListener("click", function() {
	guess = alphabet.childNodes[i].innerHTML;
	checkIfValid(guess);
    checkIfLost(mistakes);
    checkIfWin();
    makeHidden(this);
	});
}


// HEADER FADE IN
window.addEventListener('load', function() {
    header.style.visibility = 'visible';
    setTimeout(function() {
        header.style.opacity = '1';
    }, 2000);
  });



