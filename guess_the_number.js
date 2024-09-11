let randomNumber = Math.floor(Math.random() * 100) + 1; 
let attempts = 0;

console.log("Generated Random Number:", randomNumber); 

document.getElementById('guessBtn').addEventListener('click', function() {
    const userGuess = Number(document.getElementById('guessInput').value); 
    const message = document.getElementById('message'); 
    const score = document.getElementById('score'); 
   
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        message.textContent = "Please enter a valid number between 1 and 100.";
        return; 
    }

    attempts++; 
    if (userGuess === randomNumber) {
        message.textContent = "🎉 Congratulations! You guessed the correct number!";
        score.textContent = `It took you ${attempts} attempts to guess the correct number.`;
        document.getElementById('restartBtn').style.display = 'inline-block'; 
        document.getElementById('returnBtn').style.display = 'inline-block'; 
        document.getElementById('guessBtn').disabled = true; 
    } else if (userGuess > randomNumber) {
        message.textContent = "🔼 Too high! Try again.";
    } else {
        message.textContent = "🔽 Too low! Try again.";
    }

    
    document.getElementById('guessInput').value = '';
});


document.getElementById('restartBtn').addEventListener('click', function() {
    randomNumber = Math.floor(Math.random() * 100) + 1; 
    attempts = 0;
    document.getElementById('guessInput').value = ''; 
    document.getElementById('message').textContent = '';
    document.getElementById('score').textContent = ''; 
    document.getElementById('guessBtn').disabled = false; 
    this.style.display = 'none'; 
    document.getElementById('returnBtn').style.display = 'none'; 
    console.log("New Random Number:", randomNumber); 
});
