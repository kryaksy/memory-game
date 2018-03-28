// FIXME: Restarting continuing game causes bug
const gameBoard = document.querySelector('.board');
const modal = document.querySelector('#modal');
const game = document.querySelector('#game');
const moveCountElement = document.querySelector('#moveCount');
const gameTimer = document.getElementById("timer");
const totalTime = document.querySelector('#totalTime')

//Create a list that holds all of your cards
let faItems = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];


/*
 * FUNCTIONS
 */

// Creating Deck HTML
newGame = () => {
    matchedCards = 0;
    moveCount, min, sec = 0;
    modal.style.display = 'none';
    gameBoard.innerHTML = '';
    defaultStars();
    shuffle(faItems);
    newDeck();
    timerStarted = false;
    clearInterval(timer);
    gameTimer.innerHTML = '00:00';
}

// Shuffle function from http://stackoverflow.com/a/2450976
shuffle = (array) => {
    var curr = array.length, temp, rand;

    while (curr) {
        rand = Math.floor(Math.random() * curr);
        curr--;
        temp = array[curr];
        array[curr] = array[rand];
        array[rand] = temp;
    }
    return array;
}

// Create new Deck
newDeck = () => {
    var newDeck = document.createElement('container');
    newDeck.classList.add('deck');
    moveCount = 0;
    moveCountElement.innerHTML = moveCount;

	for (var i = 0; i < faItems.length; i++) {
		var newCard = document.createElement('div');
        var back = document.createElement('div');
        newCard.classList.add('card');
        newCard.id = i + 1;
		back.classList.add('back', 'fa', faItems[i]);
		newCard.append(back);
        newDeck.append(newCard);
	}
    gameBoard.append(newDeck);
}

// Timer Function
// TODO: Try timer.js library @https://github.com/husa/timer.js/
let sec = 0;
let min = 0;
myTimer = () => {
    sec++;

    if (!(sec%60)) {
        sec = 0;
        min++;
    }

    if (min.toString().length == 1) {
        min = '0' + min;
    }

    if (sec.toString().length == 1) {
        sec = '0' + sec;
    }
    gameTimer.innerHTML = min + ':' + sec;
    totalTime.innerHTML = min + ':' + sec;
}

// Stars action
actStars = (a,b,c) => {
    if (a > b) {
        game.querySelector('.stars').children[2].classList.remove('active');
        modal.querySelector('.stars').children[2].classList.remove('active');

        if (a > c) {
            game.querySelector('.stars').children[1].classList.remove('active');
            modal.querySelector('.stars').children[1].classList.remove('active');
        }
    }
}

// Stars default
defaultStars = () => {
    game.querySelector('.stars').children[0].classList.add('active');
    game.querySelector('.stars').children[1].classList.add('active');
    game.querySelector('.stars').children[2].classList.add('active');
    modal.querySelector('.stars').children[0].classList.add('active');
    modal.querySelector('.stars').children[1].classList.add('active');
    modal.querySelector('.stars').children[2].classList.add('active');
}


/*
 * LISTENERS
 */

// Restart the Game on game panel
game.querySelector('.restart').addEventListener('click', newGame)

// Restart the Game on modal
modal.querySelector('.restart').addEventListener('click', newGame);

// Close the Modal
modal.querySelector('.close').addEventListener('click', closeModal = () => modal.style.display = 'none')

// Play the game
var matchedCards, moveCount;
let comparingList = [];
gameBoard.addEventListener('click', (e) => {
    if (e.target.id !== comparingList[0] && !(e.target.classList.contains('back')) && !(e.target.classList.contains('deck'))) {
        e.target.classList.add('open');
        comparingList.push(e.target.id);

        if (comparingList[0]) {
            if (comparingList[1]) {
                let firstCard = document.getElementById(comparingList[0]);
                let secondCard = document.getElementById(comparingList[1]);

                if (firstCard.querySelector('.back').classList[2] == secondCard.querySelector('.back').classList[2]) {
                    matchedCards++;
                    setTimeout( () => {
                        firstCard.classList.add('match');
                        secondCard.classList.add('match');

                        if (matchedCards === 8) {
                            clearInterval(timer);
                            actStars(moveCount,8,15);
                            setTimeout(function () {
                                modal.style.display = 'block';
                            }, 300)
                            moveCount = 0;
                        }
                    },400)
                }else{
                    setTimeout( () => {
                        firstCard.classList.remove('open');
                        secondCard.classList.remove('open');
                    },400)
                    moveCount++;
                    actStars(moveCount,8,15);
                    moveCountElement.innerHTML = moveCount;
                }
                comparingList = [];
            }
        }
    }
})

// Start the timer at first click
var timerStarted = false;
gameBoard.addEventListener('click', () => {
    if (!timerStarted) {
        timer = setInterval(myTimer, 1000);
        timerStarted = true;
    }
})

newGame();
