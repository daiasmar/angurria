// DICES CONSTANTS
const dices = document.querySelectorAll('#dices');

// BUTTON CONSTANTS
const enterBtn = document.querySelector('#btn__subm');
const rollBtn = document.querySelector('#btn__more');
const nextBtn = document.querySelector('#btn__next');

// BOXES CONSTANTS
const playersNameBox = document.querySelector('#prnt__plyrs');
const currentRound = document.querySelector('#actual__round');
const currentTurn = document.querySelector('#actual__turn');
const rollsBox = document.querySelector('#prnt__rolls');
const tableScoreBox = document.querySelector('#table__score');
const scoreBox = document.querySelector('#box__score');

// VARIABLES
let round = 1;
let players = [];
let playersStorage = JSON.parse(window.sessionStorage.getItem('players'));
let playersStorageLenght = playersStorage && (Object.keys(playersStorage).length);
let rolls = [];
let playerPosition = 0;

// REGISTER PLAYERS' NAMES FUNCTION
function registerPlayer(){
    
    let playerData = {
        name: document.querySelector('#inpt__inst').value,
        round1: 0,
        round2: 0,
        round3: 0,
        round4: 0,
        round5: 0,
        round6: 0,
        round7: 0,
        round8: 0,
        round9: 0,
        round10: 0,
        total: 0,
    }

    players.push(playerData);

    sessionStorage.setItem('players', JSON.stringify(players));

    let playerName = playersNameBox.appendChild(document.createElement('p'));
    playerName.classList.add('font__b', 'c__wht');
    players.forEach(({name}, index) => {
        playerName.innerHTML = `player ${index+1}: ${name}`;
    });  
}

// END OF THE GAME FUNCTION
function end(){
    if(round>=11){
        currentRound.innerHTML = 'end';
        currentTurn.innerHTML = 'end';
        paintEnd();
    }
}

// NEXT ROUND FUNCTION
function passRound(){
    if(round<11){
        if(playerPosition>=playersStorageLenght-1){
            rolls = [];
            playerPosition = 0;
            round++;
            paintRound();
            playersStorage[playerPosition] && paintTurn();
            rollsBox.innerHTML = '';
        }else{
            rolls = [];
            playerPosition++;
            playersStorage[playerPosition] && paintTurn();
            rollsBox.innerHTML = '';
        }
    }

    end();
}

// MAIN GAME FUNCTION
function rollDice(){
    if(round<11){
        let sum = 0;

        dices.forEach(dice => {
            let random = Math.floor((Math.random()*6)+1);
            dice.className = "dices";
            dice.classList.add(`show__${random}`);
            sum += random;
        })

        rolls.push(sum);

        if(sum !== 7){
            if(playerPosition<playersStorageLenght){
                let sum = rolls.reduce((a,b) => a+b, 0);
                playersStorage[playerPosition][`round${round}`] = sum;
                setTimeout(() => {
                    paintRolls();
                }, 5000)
            }

        }else{
            rolls = [];
            playersStorage[playerPosition][`round${round}`] = 0;
            playerPosition++;
            setTimeout(() => {
                rollsBox.innerHTML = '';
                playersStorage[playerPosition] && paintTurn();
            }, 5000)

            if(playerPosition>=playersStorageLenght){
                round++;
                playerPosition = 0;
                setTimeout(() => {
                    paintRound();
                    paintTurn();
                }, 5000)
            }
        }

        setTimeout(() => {
            paintTotal();
            paintScore();
            end();
        }, 5000);
    }
}

// PAINT DATA ON HTML FUNCTIONS
let paintEnd = () => {
    let endBtn = scoreBox.appendChild(document.createElement('button'));
    endBtn.classList.add('btn__1', 'font__btn', 'flex__self--sta', 'curs__pnt');
    let endA = endBtn.appendChild(document.createElement('a'));
    endA.setAttribute('href', '../index.html');
    endA.innerHTML = 'play again';  
}
let paintTotal = () => {
    let num = Object.values(playersStorage[playerPosition]);
    num.pop();
    num.shift();
    let sum = num.reduce((a,b) => a+b, 0);
    playersStorage[playerPosition].total = sum;
}
let paintScore = () => {
    if(tableScoreBox){
        tableScoreBox.innerHTML = '';
        playersStorage.forEach(player => {
            let playerTR = tableScoreBox.appendChild(document.createElement('tr'));
            playerTR.classList.add('c__wht', 'font__b')
            let playerScore = Object.values(player);
            playerScore.forEach(value => {
                let playerTD = playerTR.appendChild(document.createElement('td'));
                playerTD.innerHTML = '';
                playerTD.innerHTML = value
            })
        })
    }
}
let paintTurn = () => currentTurn && (currentTurn.innerHTML = playersStorage[playerPosition].name);
let paintRound = () => currentRound && (currentRound.innerHTML = round);
let paintRolls = () => {
    rollsBox.innerHTML = '';
    rolls.forEach(roll => {
        let rollP = rollsBox.appendChild(document.createElement('p'));
        rollP.classList.add('font__b', 'c__wht');
        rollP.innerHTML = roll;
    });
}

// ADD EVENT LISTENER CLICK TO ACTION BUTTONS
enterBtn && enterBtn.addEventListener('click', registerPlayer);
nextBtn && nextBtn.addEventListener('click', passRound);
rollBtn && rollBtn.addEventListener('click', rollDice);

// FUNCTIONS INVOKED TO PAINT DATA AT GAME START
paintRound();
paintTurn();
paintScore();