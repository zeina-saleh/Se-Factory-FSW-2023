
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const names_btn = document.getElementById('names-btn');
const names_container = document.getElementById('player-names');
const title = document.getElementById('title');

localStorage.setItem('player', 'p1')
// array containing winning combinations
let wining_cases = [['box1', 'box2', 'box3'], ['box4', 'box5', 'box6'], ['box7', 'box8', 'box9'],
['box1', 'box4', 'box7'], ['box2', 'box5', 'box8'], ['box3', 'box6', 'box9'], ['box1', 'box5', 'box9'],
['box3', 'box5', 'box7']]
let attempts_x = []
let attempts_o = []
let counter = 0;
let game_won = false;
let player1_score = 0;
let player2_score = 0;

// set players names on screen
function setPlayerNames() {
    const name1 = player1.value || 'Player1';
    const name2 = player2.value || 'Player2';
    names_container.style.display = 'none'
    title.innerText = name1 + " VS " + name2;
}

// clear boxes
function clearBoxes() {
    for (let i = 1; i <= 9; i++) {
        let box = document.getElementById('box' + i);
        attempts_x = []
        attempts_o = []
        box.innerText = "";
        game_won = false;
    }
}

// play game
for (let i = 1; i <= 9; i++) {
    let box = document.getElementById('box' + i);
    box.addEventListener('click', function () {
        let current_player = localStorage.getItem('player');
        if (current_player == 'p1') {
            box.innerText = "X"
            localStorage.setItem('player', 'p2');
            attempts_x.push(box.id)
            if (attempts_x.length >= 3) {
                for (let j = 0; j < wining_cases.length; j++) {
                    if (matchArrays(wining_cases[j], attempts_x)) {
                        player1_score++;
                        const name1 = player1.value || 'Player1';
                        title.innerHTML = name1 + ' wins' + '<br>' + player1_score + " - " + player2_score
                        game_won = true;
                        clearBoxes();
                        break;
                    }
                }
            }

        } else {
            box.innerText = "O"
            localStorage.setItem('player', 'p1');
            attempts_o.push(box.id)
            if (attempts_o.length >= 3) {
                for (let j = 0; j < wining_cases.length; j++) {
                    if (matchArrays(wining_cases[j], attempts_o)) {
                        player2_score++;
                        const name2 = player2.value || 'Player2';
                        title.innerHTML = name2 + ' wins' + '<br>' + player1_score + " - " + player2_score
                        game_won = true;
                        clearBoxes();
                        break;
                    }
                }
            }
        }
        if (attempts_o.length + attempts_x.length == 9 && game_won == false) {
            clearBoxes();
            title.innerHTML = 'Draw'
        }
    });
}

// function to check if elements in array exist in winning cases
function matchArrays(arr1, arr2) {
    if (arr2.length < arr1.length) {
        return false
    }
    counter = 0
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] == arr2[j]) {
                counter++
            }
        }
    }
    if (counter == arr1.length) {
        return true
    }
    return false
}

// add event listener
names_btn.addEventListener('click', setPlayerNames)