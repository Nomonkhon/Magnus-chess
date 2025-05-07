
let board;
let game;
function showDifficulty() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("difficultyScreen").style.display = "block";
}

function startGame(level) {
  document.getElementById("difficultyScreen").style.display = "none";
  document.getElementById("game").style.display = "block";
  startTimer();

  game = new Chess();
  board = Chessboard('board', {
    draggable: true,
    position: 'start',
    onDrop: function (source, target) {
      let move = game.move({
        from: source,
        to: target,
        promotion: 'q'
      });
      if (move === null) return 'snapback';
      window.setTimeout(makeBestMove, 250);
    }
  });
}

function startTimer() {
  let time = 600;
  const timer = document.getElementById("timer");
  const interval = setInterval(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timer.innerText = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    time--;
    if (time < 0) {
      clearInterval(interval);
      alert("Время вышло! Вы проиграли чемпиону мира. Это тоже достижение!");
    }
  }, 1000);
}

function makeBestMove() {
  let possibleMoves = game.moves();
  if (game.game_over() || possibleMoves.length === 0) {
    if (game.in_checkmate()) {
      alert("Поздравляю, теперь вы чемпион мира!");
    } else {
      alert("Ничья!");
    }
    return;
  }
  let move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  game.move(move);
  board.position(game.fen());
}
