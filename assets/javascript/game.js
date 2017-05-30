var wins = 0;
var losses = 0;
var wordBank = ['jaguar', 'python', 'gorilla', 'elephant'];
var currentWord;
var guesses = [];
var selectedWord = [];
var wrongGuess;

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
	for (var i = 0; i < selectedWord.length; i++) {
		if (guess == selectedWord[i]) {
			var node = document.createTextNode(selectedWord[i]);
			var element = document.getElementById("c" + i);
			element.appendChild(node);
		}
	}
};

makeTiles();



