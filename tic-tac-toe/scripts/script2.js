
// initialize element variables
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const names_btn = document.getElementById('names-btn');
const names_container = document.getElementById('player-names');
const title = document.getElementById('title');

// declare required variables
let attempts_x = []
let attempts_o = []
let game_won = false;
let player1_score = 0;
let player2_score = 0;

let winning_cases = [['box1', 'box2', 'box3'], ['box4', 'box5', 'box6'], ['box7', 'box8', 'box9'],
['box1', 'box4', 'box7'], ['box2', 'box5', 'box8'], ['box3', 'box6', 'box9'], ['box1', 'box5', 'box9'],
['box3', 'box5', 'box7']]

// set players names on screen
function setPlayerNames() {
    const name1 = player1.value || 'Player1'; // case the player doesn't fill in his name
    const name2 = player2.value || 'Player2';
    names_container.style.display = 'none';
    title.innerText = name1 + " VS " + name2;
}

// clear boxes
function resetGame() {
    for (let i = 1; i <= 9; i++) {
        let box = document.getElementById('box' + i);
        attempts_x = []
        attempts_o = []
        box.innerText = "";
        game_won = false;
    }
}

//  function to check if elements of an array exist in a matrix
function matchArray(array, matrix) {
    // accessing matrix row
    for (let i = 0; i < matrix.length; i++) {
        counter = 0
        // accessing array
        for (let j = 0; j < array.length; j++) {
            // accessing matrix[i] values
            for (let k = 0; k < 3; k++) {
                if (array[j] == matrix[i][k]) {
                    counter++
                }
            }
        } if (counter == 3) {
            return true
        }
    } return false
}

// player wins 
function win(player, attempts_array) {
    const name1 = player1.value || 'Player1';
    const name2 = player2.value || 'Player2';
    if (attempts_array.length >= 3 && matchArray(attempts_array, winning_cases)) {
        if (player == player1) {
            player1_score++
            title.innerHTML = name1 + ' wins' + '<br>' + player1_score + " - " + player2_score;

        }
        else {
            player2_score++
            title.innerHTML = name2 + ' wins' + '<br>' + player2_score + " - " + player1_score;
        }
        game_won = true;
        resetGame();
    }
}

// game logic
localStorage.setItem('player', 'p1')
function playGame(e) {
    if (localStorage.getItem('player') == 'p1') {
        e.target.innerText = 'X'
        attempts_x.push(e.target.id)
        localStorage.setItem('player', 'p2')
        win(player1, attempts_x)
    }
    else {
        e.target.innerText = 'O'
        attempts_o.push(e.target.id)
        localStorage.setItem('player', 'p1')
        win(player2, attempts_o)

    } if (attempts_o.length + attempts_x.length == 9 && game_won == false) {
        resetGame();
        title.innerHTML = 'Draw'
    }
}

// add event listeners on submit btn and boxes
names_btn.addEventListener('click', setPlayerNames)

for (let i = 1; i <= 9; i++) {
    let box = document.getElementById('box' + i);
    box.addEventListener('click', playGame);
}