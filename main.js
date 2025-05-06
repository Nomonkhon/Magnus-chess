
function showDifficulty() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("difficultyScreen").style.display = "block";
}

function startGame(level) {
  document.getElementById("difficultyScreen").style.display = "none";
  document.getElementById("game").style.display = "block";
  startTimer();
  document.getElementById("board").innerHTML = "<p>Шахматная доска будет здесь (" + level + ")</p>";
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
