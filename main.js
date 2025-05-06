let board = null;
let game = new Chess();
let level = 'easy';
let userTime = 600, aiTime = 600;
let interval;

document.getElementById('start-btn').onclick = () => {
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('difficulty-screen').classList.remove('hidden');
};

document.querySelectorAll('.level-btn').forEach(btn => {
  btn.onclick = () => {
    level = btn.dataset.level;
    document.getElementById('difficulty-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    startGame();
  };
});

function startGame() {
  board = Chessboard('board', {
    draggable: true,
    position: 'start',
    onDrop: onDrop
  });
  startTimer();
}

function startTimer() {
  interval = setInterval(() => {
    if (game.turn() === 'w') userTime--;
    else aiTime--;
    document.getElementById('user-time').textContent = formatTime(userTime);
    document.getElementById('ai-time').textContent = formatTime(aiTime);
    if (userTime <= 0 || aiTime <= 0 || game.game_over()) {
      clearInterval(interval);
      showResult();
    }
  }, 1000);
}

function formatTime(seconds) {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function onDrop(source, target) {
  let move = game.move({ from: source, to: target, promotion: 'q' });
  if (move === null) return 'snapback';
  board.position(game.fen());
  setTimeout(makeAIMove, 500);
}

function makeAIMove() {
  if (game.game_over()) {
    showResult();
    return;
  }
  let possibleMoves = game.moves();
  let move;
  if (level === 'easy') move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  else if (level === 'medium') move = possibleMoves.sort(() => 0.5 - Math.random())[0];
  else move = possibleMoves[0];
  game.move(move);
  board.position(game.fen());
}

function showResult() {
  let result = document.getElementById('result');
  result.classList.remove('hidden');
  if (game.in_checkmate() && game.turn() === 'b') {
    result.textContent = 'Поздравляю, теперь вы чемпион мира';
  } else {
    result.textContent = 'Вы проиграли чемпиону мира, это тоже достижение';
  }
}
