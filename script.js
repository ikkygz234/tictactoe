const board = document.getElementById('board');
const statusText = document.getElementById('status');
const playerXEl = document.getElementById('playerX');
const playerOEl = document.getElementById('playerO');

let currentPlayer = 'X';
let gameActive = true;
let cells = Array(9).fill('');

function renderBoard() {
  board.innerHTML = '';
  cells.forEach((cell, index) => {
    const button = document.createElement('button');
    button.classList.add('cell');
    button.textContent = cell;
    button.addEventListener('click', () => makeMove(index));
    board.appendChild(button);
  });
}

function makeMove(index) {
  if (!gameActive || cells[index]) return;
  cells[index] = currentPlayer;
  renderBoard();
  if (checkWinner()) {
    statusText.textContent = `Pemain ${currentPlayer} Menang! 🎉`;
    gameActive = false;
  } else if (cells.every(cell => cell)) {
    statusText.textContent = 'Seri! 🤝';
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Giliran Pemain ${currentPlayer}`;
    updateTurnIndicator();
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // baris
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // kolom
    [0, 4, 8], [2, 4, 6]             // diagonal
  ];
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function updateTurnIndicator() {
  playerXEl.classList.toggle('active', currentPlayer === 'X');
  playerOEl.classList.toggle('active', currentPlayer === 'O');
}

function resetGame() {
  cells = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Giliran Pemain ${currentPlayer}`;
  renderBoard();
  updateTurnIndicator();
}

// Inisialisasi saat pertama kali halaman dimuat
resetGame();