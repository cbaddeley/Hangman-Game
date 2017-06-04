var wins = 0; //This variable tracks the wins
var losses = 0; //This variable tracks the losses
var wordBank = ['jaguar', 'python', 'gorilla', 'elephant', 'monkey', 'macaw']; //These are the words that can be selected. The array will lose an element during the selectWord function.
var currentWord; // This is the word selected by the computer during the selectWord function.
var guesses = []; // Holds the chars the user inputs. I put an empty string in here so I wouldn't need a <= in a later for loop
var selectedWord = []; //Array of chars from the currentWord variable.
var guessesLeft = 7; // Setting it at 10 because I want to show it on the page and subtract then rewrite to the DOM.
var guess = ''; //Determined through a key press. Had to make it global in order to use a function to manipulate the DOM in the "guesses" section.
var correctCount = 0; //Everytime a guess is appended to the selectedWord elements, this counter goes up in order to check win condition.
var pickedWord = 0;
var animalArray = [
	['assets/images/jaguar.jpg', new Audio('assets/sounds/jaguar.mp3'), "Jaguars can be distinguished from other big cats by the shape of their spots. The spots resemble roses, and as such are known as rosettes."],
	['assets/images/python.jpg', new Audio('assets/sounds/python.mp3'), "Pythons are constrictors. They kill their prey by squeezing them until they stop breathing."],
	['assets/images/gorilla.jpg', new Audio('assets/sounds/gorilla.mp3'), "Gorilla can mate any time during the year. Pregnancy in female lasts 8.5 months and ends with one baby."],
	['assets/images/elephant.jpg', new Audio('assets/sounds/elephant.mp3'), "Elephants sleep 2-3 hours per day. They spend the rest of the time in eating."],
	['assets/images/monkey.jpg', new Audio('assets/sounds/monkey.mp3'), "Woolly monkey is a medium sized animal. It can reach 20 to 24 inches in length and 11 to 18 pounds in weight. Males are larger than females."],
	['assets/images/macaw.jpg', new Audio('assets/sounds/macaw.mp3'), "Natural enemies of scarlet macaws are monkeys, jaguars, hawks, eagles and snakes."]
]
var fire = new Audio('assets/sounds/fire.mp3');
var applause = new Audio('assets/sounds/applause.mp3');

function startGame() {
	document.getElementById("buttonSpacer").style.display = "none";
	document.getElementById("container").style.visibility = "visible";
	makeTiles();
	scoreCard();
}

function resetVars() { //This function changes all the global vars that need to go back to their original value. Otherwise
	document.getElementById("wordSection").innerHTML = "";
	guesses = [];
	guessesLeft = 7;
	guess = '';
	correctCount = 0;
	document.getElementById("guesses").innerHTML = "";
	document.getElementById("window").style.display = "none";
}

function selectWord() { 
	pickedWord = Math.floor(Math.random() * wordBank.length); //Math.random generates a number between 0 and 1 and it's multiplied by the array length for available words then it's rounded down.
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

function scoreCard() {
	document.getElementById("wins").innerHTML = wins;
	document.getElementById("losses").innerHTML = losses;
	document.getElementById("wordsLeft").innerHTML = wordBank.length;
	document.getElementById("guessesLeft").innerHTML = guessesLeft;
}

function zeroGuess() {
	if (guessesLeft == 0) {
			losses++;
			function localFunc() {
				resetVars();
				makeTiles();
				scoreCard();
			}
			document.getElementById("window").style.display = "block";
			document.getElementById("windowImg").src = "assets/images/junglefire.jpg";
			document.getElementById("windowTitle").innerHTML = "You Lost!!";
			document.getElementById("imgDescription").innerHTML = "You failed to guess the word, and the jungle burned down as a result. Good job!";
			document.getElementById("buttonSpan").innerHTML = "Click to play again!";
			fire.play();
			animalArray.splice(pickedWord, 1);
			document.getElementById("windowButton").onclick = function() {localFunc()};
	}
}

function win() {
	if (correctCount == selectedWord.length && wordBank.length > 0) {
			wins++;
			function localFunc() {
				resetVars();
				makeTiles();
				scoreCard();
			}
			document.getElementById("window").style.display = "block";
			document.getElementById("windowImg").src = animalArray[pickedWord][0];
			document.getElementById("windowTitle").innerHTML = "You Won!!";
			document.getElementById("imgDescription").innerHTML = animalArray[pickedWord][2];
			document.getElementById("buttonSpan").innerHTML = "Click to play again!";
			animalArray[pickedWord][1].play();
			animalArray.splice(pickedWord, 1);
			document.getElementById("windowButton").onclick = function() {localFunc()};
	}
}

function finished() {
	if ((correctCount == selectedWord.length || guessesLeft == 0) && wordBank.length == 0) {
		
		if (correctCount == selectedWord.length) {
			wins++;
		} else if (guessesLeft == 0) {
			losses++;
		}
			document.getElementById("window").style.display = "block";
			document.getElementById("windowTitle").innerHTML = "Game Over!!";
			document.getElementById("buttonSpan").innerHTML = "Click to Close Window!";
			applause.play();
			document.getElementById("windowButton").onclick = function() {close()};

		if (losses == 0) {
			document.getElementById("windowImg").src = 'assets/images/george.jpg';
			document.getElementById("imgDescription").innerHTML = "Congratulations! You are the true jungle master.";
		} else if (wins == 0) {
			document.getElementById("windowImg").src = 'assets/images/jake.jpg';
			document.getElementById("imgDescription").innerHTML = "Hey! At least you did better at this game than this kid did acting in Star Wars.";
		} else if (wins > losses) {
			document.getElementById("windowImg").src = 'assets/images/ace.jpg';
			document.getElementById("imgDescription").innerHTML = "You know your animals, but you need to focus.";
		} else {
			document.getElementById("windowImg").src = 'assets/images/rob.jpg';
			document.getElementById("imgDescription").innerHTML = "You're tuned in to your fellow animals. Just not the intelligent ones.";
		} 	
	}
}

document.onkeyup = function(event) {
	var guess = event.key.toLowerCase();
	var guessBool = false;
	var found = false;
	if (/^[a-zA-Z]$/.test(guess)) {
		for (var i = 0; i <= guesses.length; i++) {
			if (guess == guesses[i]) {
				guessBool = true;
				break;
			} 
		}
		if (!guessBool) {
			guesses.push(guess);
			for (var j = 0; j < selectedWord.length; j++) {
				if (guess == selectedWord[j]) {
					var node = document.createTextNode(selectedWord[j].toUpperCase());
					var element = document.getElementById("c" + j);
					element.appendChild(node)
					found = true;
					correctCount++;
				} 
			}
			if (!found) {
				guessesLeft--;
			} 
		}
		if (!found && !guessBool) {
			//Here I add the guess to the "guesses" section of the html and increase wrong guesses in the HTML
			document.getElementById("guesses").innerHTML += '<div class="clearTile">' + guess.toUpperCase() + '</div>';
			document.getElementById("guessesLeft").innerHTML = guessesLeft;
		}	

		zeroGuess();
		win();
		finished();
	}
}







