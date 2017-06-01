var wins = 0; //This variable tracks the wins
var losses = 0; //This variable tracks the losses
var wordBank = ['jaguar', 'python', 'gorilla', 'elephant']; //These are the words that can be selected. The array will lose an element during the selectWord function.
var currentWord; // This is the word selected by the computer during the selectWord function.
var guesses = [""]; // Holds the chars the user inputs. I put an empty string in here so I wouldn't need a <= in a later for loop
var selectedWord = []; //Array of chars from the currentWord variable.
var wrongGuess = 10; // Setting it at 10 because I want to show it on the page and subtract then rewrite to the DOM.
var guess = ''; //Determined through a key press. Had to make it global in order to use a function to manipulate the DOM in the "guesses" section.
var correctCount = 0; //Everytime a guess is appended to the selectedWord elements, this counter goes up in order to check win condition.

function selectWord() { 
	var pickedWord = Math.floor(Math.random() * wordBank.length); //Math.random generates a number between 0 and 1 and it's multiplied by the array length for available words then it's rounded down.
	currentWord = wordBank[pickedWord]; //pickedWord is a number and this is taking the word assigned to that number and assigning it to the var currentWord
	wordBank.splice(pickedWord, 1); //Takes the number from pickedWord and removes it from the array. The #1 refers to the number of elements to remove. This is so we don't repeat words.
	selectedWord = currentWord.split(""); //This is spliting up the currentWord into the array selectedWord which is full of chars 
}

function makeTiles() {
	selectWord(); //calls the selectWord function
	var numberOfTiles = currentWord.length; //assigns a local variable to know how many tiles to create.
	//this for loop needs the id of "c" + "i" because it'll be used later to fill in correct answers
	for (var i = 0; i < numberOfTiles; i++) {
		document.getElementById("wordSection").innerHTML += '<div class="tile" id="c' + i + '"></div>';
	}
}

document.onkeyup = function(event) {
	var guess = event.key;
	var guessBool = false;
	var found = false;

	for (var i = 0; i < guesses.length; i++) {
		if (guess == guesses[i]) {
			guessBool = true;
			break;
		} 
	}
	if (!guessBool) {
		guesses.push(guess);
		for (var j = 0; j < selectedWord.length; j++) {
			if (guess == selectedWord[j]) {
				var node = document.createTextNode(selectedWord[j]);
				var element = document.getElementById("c" + j);
				element.appendChild(node)
				found = true;
				correctCount++;
			} 
		}
		if (!found) {
			wrongGuess--;
		} 
	}
	//if (!found && !guessBool) {
		//Here I need to execute an function that pushes the guess to the "guesses" section of the html and increase wrong guesses in the HTML
	//}	

	if (wrongGuess == 0) {
		//Need to write a lose condition
	}

	if (correctCount == selectedWord.length && wordBank.length > 0) {
		//Run Win function
	}

	if (correctCount == selectedWord.length && wordBank.length == 0) {
		//Run Finished function
	}

}


makeTiles();



