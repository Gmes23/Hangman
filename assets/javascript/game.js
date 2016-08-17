

function setImage(number) {
	$('#hangman_img').removeAttr("class").addClass("image" +  number);
}


var wordlist = [
["T", "H", "E", "B", "E", "A", "T", "L", "E", "S"],
  ["G","R","E","E","N","D","A","Y",],
  ["A","C","D","C",],
  ["M","C","R",],
  ["R","O","L","L","I","N","G","S","T","O", "N", "E", "S" ,]
  ["N", "I","R","V", "A","N","A"]
]

var random = Math.floor((Math.random()*(wordlist.length-1)));

var newWord = wordlist[random]


var guesses = [];
function drawGuesses () {
	guesses.sort();
	$('#previousGuesses').html(guesses.join(','));
}



function drawWord() {
    while (targetWord == '') {
        newWord();
    }
   
}

function drawGuesses() {
    guesses.sort();
    $('#previousGuesses').html(guesses.join(', '));
}

function cleanGuess() {
    var uniqueGuesses = [];
    $.each(guesses, function(index, element) {
        if (element.length > 0 && $.inArray(element, uniqueGuesses) == -1) {
            uniqueGuesses.push(element);
        }
    });
    guesses = uniqueGuesses;
}

function addGuess() {
    if (/^[a-zA-Z]*$/.test($('#guess').val()) && typeof $('#guess').val() !== "undefined") {
        guesses.push($('#guess').val().toLowerCase());
    }

    $('#guess').val('');
}

function endGameDialog(isWinner) {
    if (isWinner) {
        $('#endGameDialogTitle').html('You won');
        $('#endGameDialogContent').html('You guessed ' + targetWord + ' in ' + guesses.length + ' attempts');
    } else {
        $('#endGameDialogTitle').html('You lost');
        $('#endGameDialogContent').html('Unlucky.  The word was ' + targetWord);
    }

    $('#endGameDialog').modal('toggle');
}

function reviewLives() {
    var livesRemaining = maxLives,
            string = targetWord.toLowerCase();

    for (var i = 0; i < guesses.length; i++) {
        if (string.indexOf(guesses[i], 0) == -1) {
            livesRemaining--;
        }
    }

    if (livesRemaining <= 0) {
        setImage(0);
        endGameDialog(false);
        return;
    }

    setImage(maxLives - livesRemaining);
}

function checkIfWon() {
    if (obfuscateWord() == targetWord) {
        endGameDialog(true);
    }
}

function resetGame() {
    setImage(0);
    targetWord = '';
    guesses = [];
    newWord();
}

function update() {
    addGuess();
    cleanGuess();
    drawWord();
    drawGuesses();
    reviewLives();
    checkIfWon();
}

$(document).ready(function() {
    
    drawWord();
    drawGuesses();
    $('#guess').attr('onkeyup', 'update();');
});