var wins = 0; //This variable tracks the wins
var losses = 0; //This variable tracks the losses
var wordBank = ['jaguar', 'python', 'gorilla', 'elephant', 'monkey', 'macaw']; //These are the words that can be selected. The array will lose an element during the selectWord function.
var currentWord; // This is the word selected by the computer during the selectWord function.
var guesses = []; // Holds the chars the user inputs. I put an empty string in here so I wouldn't need a <= in a later for loop
var selectedWord = []; //Array of chars from the currentWord variable.
var guessesLeft = 7; // Setting it at 10 because I want to show it on the page and subtract then rewrite to the DOM.
var guess = ''; //Determined through a key press. Had to make it global in order to use a function to manipulate the DOM in the "guesses" section.
var correctCount = 0; //Everytime a guess is appended to the selectedWord elements, this counter goes up in order to check win condition.
var pickedWord = 0; //This is for the animalArray and calling to it for the win condition.
var animalArray = [ //I didn't include the wordBank stuff in this array because I had written too much and it's fine doing it like this.
	['assets/images/jaguar.jpg', new Audio('assets/sounds/jaguar.mp3'), "Jaguars can be distinguished from other big cats by the shape of their spots. The spots resemble roses, and as such are known as rosettes."],
	['assets/images/python.jpg', new Audio('assets/sounds/python.mp3'), "Pythons are constrictors. They kill their prey by squeezing them until they stop breathing."],
	['assets/images/gorilla.jpg', new Audio('assets/sounds/gorilla.mp3'), "Gorilla can mate any time during the year. Pregnancy in female lasts 8.5 months and ends with one baby."],
	['assets/images/elephant.jpg', new Audio('assets/sounds/elephant.mp3'), "Elephants sleep 2-3 hours per day. They spend the rest of the time in eating."],
	['assets/images/monkey.jpg', new Audio('assets/sounds/monkey.mp3'), "Woolly monkey is a medium sized animal. It can reach 20 to 24 inches in length and 11 to 18 pounds in weight. Males are larger than females."],
	['assets/images/macaw.jpg', new Audio('assets/sounds/macaw.mp3'), "Natural enemies of scarlet macaws are monkeys, jaguars, hawks, eagles and snakes."]
]
var fire = new Audio('assets/sounds/fire.mp3'); 
var applause = new Audio('assets/sounds/applause.mp3');

function startGame() { //This function is called when the button is clicked on the first screen
	document.getElementById("buttonSpacer").style.display = "none"; //Removes the button
	document.getElementById("container").style.display = "block"; //Shows the game
	makeTiles();
	scoreCard();
	initial();
	$(document).on("keyup",handleKeyUp);
	$(document).on("click",function(){$('#dummy').focus();});
	$('#dummy').focus();
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

function scoreCard() { //This function resets the values of the scorecard 
	document.getElementById("wins").innerHTML = wins;
	document.getElementById("losses").innerHTML = losses;
	document.getElementById("wordsLeft").innerHTML = wordBank.length;
}

function zeroGuess() { //This is a loss function
	if (guessesLeft == 0) {
			losses++;
			function localFunc() { //I made a local function here just to input it all at once into the button
				resetVars();
				makeTiles();
				scoreCard();
				initial();
			}
			document.onkeyup = null;//This is so the user is unable to keep hitting characters and interacting with the page
			document.getElementById("window").style.display = "block"; //Brings up the win/lose/game over window
			document.getElementById("windowImg").src = "assets/images/junglefire.jpg";//places an image
			document.getElementById("windowTitle").innerHTML = "You Lost!!";
			document.getElementById("imgDescription").innerHTML = "You failed to guess the word, and the jungle burned down as a result. Good job!";
			document.getElementById("buttonSpan").innerHTML = "Click to play again!";
			fire.play();//Plays an audio file
			animalArray.splice(pickedWord, 1);//This does to the animalArray what the selectWord function did to the wordBank. I had to do it after i already got the img, audio, and text
			document.getElementById("windowButton").onclick = function() {localFunc()}; //If I put localFunc() by itself it would run automatically and the window wouldn't even pop up since it'd be reset immediately
			document.activeElement.blur();
	}
}

function win() { //function if user correctly guesses word
	if (correctCount == selectedWord.length && wordBank.length > 0) { 
			wins++;
			function localFunc() {
				resetVars();
				makeTiles();
				scoreCard();
				initial();
			}
			document.onkeyup = null;
			document.getElementById("window").style.display = "block";
			document.getElementById("windowImg").src = animalArray[pickedWord][0];//goes into the multidimensional array and pulls the image
			document.getElementById("windowTitle").innerHTML = "You Won!!";
			document.getElementById("imgDescription").innerHTML = animalArray[pickedWord][2];//pulls the text
			document.getElementById("buttonSpan").innerHTML = "Click to play again!";
			animalArray[pickedWord][1].play();//plays the corresponding audio
			animalArray.splice(pickedWord, 1);
			document.getElementById("windowButton").onclick = function() {localFunc()};
			document.activeElement.blur();
	}
}

function finished() { //Needed this function to run if the user lost or won the final round and if there are no more words
	if ((correctCount == selectedWord.length || guessesLeft == 0) && wordBank.length == 0) {
		//I still add to the wins and losses because it affects the final window
		if (correctCount == selectedWord.length) {
			wins++;
		} else if (guessesLeft == 0) {
			losses++;
		}	
			document.activeElement.blur();
			document.getElementById("window").style.display = "block";
			document.getElementById("windowTitle").innerHTML = "Game Over!!";
			applause.play();
			document.getElementById("replaceButton").style.display = "none";//Hides the button
		//Here I have different events depending on how well the user did in the game.
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

function initial() { //I wrapped all of this in this function to help with setting onkeyup to null
	document.onkeyup = function(event) { //starts with a key press
		var guess = event.key.toLowerCase(); //sets the char to a lower case
		var guessBool = false; //local variable
		var found = false; //local variable
		if (/^[a-zA-Z]$/.test(guess)) { //this is a regular expression checking to see if the input is a letter
			for (var i = 0; i <= guesses.length; i++) { //This checks to see if the user has already guessed the letter
				if (guess == guesses[i]) {
					guessBool = true; //setting it to true helps move forward to other events
					break;
				} 
			}
			if (!guessBool) { //if the user hasn't guessed the input before then this runs
				guesses.push(guess); //adds the letter the user just inputed into the guesses array
				for (var j = 0; j < selectedWord.length; j++) { //checks the guess against the array of chars of the mystery word
					if (guess == selectedWord[j]) { //if there is a match than this runs
						var node = document.createTextNode(selectedWord[j].toUpperCase()); //I change the char to upper so it's easier to read
						var element = document.getElementById("c" + j); //This grabs the correct tile in the word section
						element.appendChild(node)
						found = true; //this is for a future check
						correctCount++; //adds to the correctCount. this number is compared to the word array length and when they're equal it's a win
					} 
				}
				if (!found) { //If the user hadn't guessed the letter before but it was a wrong guess it'll end up here
					guessesLeft--; //This subtracts from the global variable
				} 
			}
			if (!found && !guessBool) { //If it's a new guess, but not a correct one, then this runs to change the DOM
				//Here I add the guess to the "guesses" section of the html and increase wrong guesses in the HTML
				document.getElementById("guesses").innerHTML += '<div class="clearTile">' + guess.toUpperCase() + '</div>'; //Changed to upper so it's easier to read
				document.getElementById("guessesLeft").innerHTML = guessesLeft;
			}	

			zeroGuess(); //Loss condition function
			win(); //Win condition function
			finished(); //Game over fuction
		}
	}
}

function handleKeyUp(event) {
	if(event.keyCode==229) {
			event.keyCode=$('#dummy').val().slice($('#dummy').val().length-1,$('#dummy').val().length).toUpperCase().charCodeAt(0);
			var guess = event.keyCode;
	}
	var guessBool = false; //local variable
		var found = false; //local variable
		if (/^[a-zA-Z]$/.test(guess)) { //this is a regular expression checking to see if the input is a letter
			for (var i = 0; i <= guesses.length; i++) { //This checks to see if the user has already guessed the letter
				if (guess == guesses[i]) {
					guessBool = true; //setting it to true helps move forward to other events
					break;
				} 
			}
			if (!guessBool) { //if the user hasn't guessed the input before then this runs
				guesses.push(guess); //adds the letter the user just inputed into the guesses array
				for (var j = 0; j < selectedWord.length; j++) { //checks the guess against the array of chars of the mystery word
					if (guess == selectedWord[j]) { //if there is a match than this runs
						var node = document.createTextNode(selectedWord[j].toUpperCase()); //I change the char to upper so it's easier to read
						var element = document.getElementById("c" + j); //This grabs the correct tile in the word section
						element.appendChild(node)
						found = true; //this is for a future check
						correctCount++; //adds to the correctCount. this number is compared to the word array length and when they're equal it's a win
					} 
				}
				if (!found) { //If the user hadn't guessed the letter before but it was a wrong guess it'll end up here
					guessesLeft--; //This subtracts from the global variable
				} 
			}
			if (!found && !guessBool) { //If it's a new guess, but not a correct one, then this runs to change the DOM
				//Here I add the guess to the "guesses" section of the html and increase wrong guesses in the HTML
				document.getElementById("guesses").innerHTML += '<div class="clearTile">' + guess.toUpperCase() + '</div>'; //Changed to upper so it's easier to read
				document.getElementById("guessesLeft").innerHTML = guessesLeft;
			}	

			zeroGuess(); //Loss condition function
			win(); //Win condition function
			finished(); //Game over fuction
		}
}





