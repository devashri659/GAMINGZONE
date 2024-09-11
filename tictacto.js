let currentPlayer = '';
let userPlayer = '';
let computerPlayer = '';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
const statusDisplay = document.querySelector('#status');

function selectPlayer(player) {
    userPlayer = player;
    computerPlayer = player === 'X' ? 'O' : 'X'; 
    currentPlayer = userPlayer;
    document.getElementById('player-selection').classList.add('hidden');
    document.getElementById('game-board').classList.remove('hidden');
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function makeMove(index) {
    if (board[index] !== '' || !gameActive || currentPlayer !== userPlayer) return; // User move

    board[index] = currentPlayer;
    document.getElementById(`cell-${index}`).textContent = currentPlayer;

    if (checkWinner()) {
        endGame(currentPlayer);
        return;
    } else if (!board.includes('')) {
        endGame('tie');
        return;
    }

    currentPlayer = computerPlayer;
    statusDisplay.textContent = `Computer's turn`;
    setTimeout(computerMove, 500); 
}

function computerMove() {
    let availableMoves = board.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    if (availableMoves.length === 0 || !gameActive) return;

    let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)]; 
    board[randomMove] = currentPlayer;
    document.getElementById(`cell-${randomMove}`).textContent = currentPlayer;

    if (checkWinner()) {
        endGame(currentPlayer);
        return;
    } else if (!board.includes('')) {
        endGame('tie');
        return;
    }

    currentPlayer = userPlayer;
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function endGame(winner) {
    gameActive = false;
    let message = '';
    if (winner === 'tie') {
        message = "It's a tie!";
    } else {
        message = `Player ${winner} wins!`;
    }


    const gameBoard = document.getElementById('game-board');
    const winnerMessage = document.createElement('div');
    winnerMessage.classList.add('winner-message');
    winnerMessage.textContent = message;
    gameBoard.appendChild(winnerMessage);

   
    document.querySelectorAll('.cell').forEach(cell => cell.classList.add('no-hover'));
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = '';
    userPlayer = '';
    computerPlayer = '';
    gameActive = true;
    document.getElementById('player-selection').classList.remove('hidden');
    document.getElementById('game-board').classList.add('hidden');
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('no-hover');
    });
    document.querySelector('.winner-message')?.remove();
    statusDisplay.textContent = '';
}
