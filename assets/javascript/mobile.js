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
}

}