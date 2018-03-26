var start = 0;

/*
 * Dom Elements
 */
const gameBoard = document.querySelector('.board');
const modal = document.querySelector('#modal');
const game = document.querySelector('#game');
const moveCountElement = document.querySelector('#moveCount');


/*
 * Create a list that holds all of your cards
 */
let faItems = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];


/*
 * FUNCTIONS
 */

// Creating Deck HTML
function newGame(a) {
    modal.style.display = 'none';

    start = Math.floor(performance.now()/1000);
    var timer = setInterval(myTimer, 1000);

    var comparingList = [];
    var matchedCards = 0;
    var moveCount = 0;
    gameBoard.innerHTML = '';
    defaultStars();

    shuffle(faItems);
    newDeck(moveCount);

    gameBoard.addEventListener('click', function (e) {
        if (e.target.id !== comparingList[0] && !(e.target.classList.contains('back')) && !(e.target.classList.contains('deck'))) {
            e.target.classList.add('open');
            comparingList.push(e.target.id);

            if (comparingList[0]) {
                if (comparingList[1]) {
                    const firstCard = document.getElementById(comparingList[0]);
                    const secondCard = document.getElementById(comparingList[1]);

                    if (firstCard.querySelector('.back').classList[2] == secondCard.querySelector('.back').classList[2]) {
                        matchedCards++;
                        setTimeout(function () {
                            firstCard.classList.add('match');
                            secondCard.classList.add('match');
                            if (matchedCards === 8) {
                                clearInterval(timer);
                                modal.querySelector('#totalTime').innerHTML = timeInterval + 's';
                                actStars(moveCount,8,13,21);
                                moveCount = 0;
                                setTimeout(function () {
                                    modal.style.display = 'block';
                                    modal.querySelector('.restart').addEventListener('click', newGame)
                                }, 300)
                            }
                        },400)
                    }else{
                        setTimeout(function () {
                            firstCard.classList.remove('open');
                            secondCard.classList.remove('open');
                        },400)
                        moveCount++;
                        actStars(moveCount,8,13,21);
                        moveCountElement.innerHTML = moveCount;
                    }
                    comparingList = [];
                }
            }
        }
    })
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Create new Deck
function newDeck(a) {
    var newDeck = document.createElement('container');
    newDeck.classList.add('deck');
    moveCountElement.innerHTML = a;

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

// ClockWatch Function
function myTimer() {
	var end = Math.floor(performance.now()/1000);
    timeInterval = Math.floor(end - start);
    document.getElementById("timer").innerHTML = timeInterval + 's';
}

// Stars active
function actStars(a,b,c,d) {
    if (a > b) {
        game.querySelector('.stars').children[2].classList.remove('active');
        modal.querySelector('.stars').children[2].classList.remove('active');
        if (a > c) {
            game.querySelector('.stars').children[1].classList.remove('active');
            modal.querySelector('.stars').children[1].classList.remove('active');
            if (a > d) {
                game.querySelector('.stars').children[0].classList.remove('active');
                modal.querySelector('.stars').children[0].classList.remove('active');
            }
        }
    }
}

// Stars default
function defaultStars() {
    game.querySelector('.stars').children[0].classList.add('active');
    game.querySelector('.stars').children[1].classList.add('active');
    game.querySelector('.stars').children[2].classList.add('active');
}

// LISTENERS

document.querySelector('.restart').addEventListener('click', newGame)

document.querySelector('.close').addEventListener('click', function () {
    document.querySelector('#modal').style.display = 'none';
})

newGame();
