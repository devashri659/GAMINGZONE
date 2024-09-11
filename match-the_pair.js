const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let cardLetters = [];
let cards = [];
let firstCard = null;
let secondCard = null;
let moves = 0;
let timer;
let startTime;

function startGame() {
    document.getElementById('start-button').classList.add('hidden');
    document.getElementById('game-board').classList.remove('hidden');
    
    cardLetters = letters.split('').slice(0, 8); 
    cards = [...cardLetters, ...cardLetters]
        .sort(() => Math.random() - 0.5)
        .map(letter => ({ letter, matched: false }));
    firstCard = null;
    secondCard = null;
    moves = 0;
    document.getElementById('moves').textContent = `Moves: ${moves}`;
    document.getElementById('game-over').classList.add('hidden');
    document.getElementById('game-board').innerHTML = cards.map((card, index) =>
        `<div class="card" data-index="${index}" onclick="flipCard(this)">
            <span>${card.letter}</span>
        </div>`
    ).join('');
    startTimer();
}

function flipCard(cardElement) {
    const index = cardElement.getAttribute('data-index');
    if (cardElement.classList.contains('flipped') || secondCard) return;

    cardElement.classList.add('flipped');
    const card = cards[index];
    if (!firstCard) {
        firstCard = cardElement;
        return;
    }

    secondCard = cardElement;
    moves++;
    document.getElementById('moves').textContent = `Moves: ${moves}`;

    const firstCardIndex = firstCard.getAttribute('data-index');
    const secondCardIndex = secondCard.getAttribute('data-index');
    if (cards[firstCardIndex].letter === cards[secondCardIndex].letter) {
        cards[firstCardIndex].matched = true;
        cards[secondCardIndex].matched = true;
        firstCard = secondCard = null;
        if (cards.every(card => card.matched)) {
            endGame();
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard = secondCard = null;
        }, 1000);
    }
}

function startTimer() {
    startTime = Date.now();
    timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const seconds = String(elapsed % 60).padStart(2, '0');
        document.getElementById('timer').textContent = `Time: ${minutes}:${seconds}`;
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    document.getElementById('game-over').classList.remove('hidden');
    document.getElementById('winner').textContent = 'You Win!';
    document.getElementById('final-moves').textContent = moves;
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const seconds = String(elapsed % 60).padStart(2, '0');
    document.getElementById('final-time').textContent = `${minutes}:${seconds}`;
}

function resetGame() {
    document.getElementById('start-button').classList.remove('hidden');
    document.getElementById('game-board').classList.add('hidden');
    startGame();
}
