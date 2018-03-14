/*jshint esversion: 6 */

// game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// ui elements
const game = document.getElementById('game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.getElementById('guess-btn');
const guessInput = document.getElementById('guess-input');
const message = document.querySelector('.message');


// assign ui min and max
minNum.textContent = min;
maxNum.textContent = max;

// paly again event listener
game.addEventListener('mousedown', (e) => {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

// listen for guess
guessBtn.addEventListener('click', () => {
    let guess = parseInt(guessInput.value);

    // validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a numbe between ${min} and ${max}`, 'red');
        return;
    }

    // check if won
    if (guess === winningNum) {
        gameOver(true, `${winningNum} is correct!`);
    } else {
        // Wrong number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            gameOver(false, `Game Over, you lost.The correct number was ${winningNum}`);
        } else {
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
});

// Game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    setMessage(msg, color);

    // play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// get winning num
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// set messahe
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}