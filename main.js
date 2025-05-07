document.getElementById('startButton').onclick = function() {
    document.querySelector('.start-screen').classList.add('hidden');
    document.querySelector('.level-screen').classList.remove('hidden');
};
document.getElementById('easy').onclick = 
document.getElementById('medium').onclick = 
document.getElementById('hard').onclick = function() {
    document.querySelector('.level-screen').classList.add('hidden');
    document.querySelector('.game-screen').classList.remove('hidden');
    var board = Chessboard('board', {
        draggable: true,
        position: 'start'
    });
};