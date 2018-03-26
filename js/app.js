// TODO: update totalTime on modal
// FIXME: timer doesn't work after latest change
var start = Math.floor(performance.now()/1000);
var myVar = setInterval(myTimer, 1000);

/*
 * Dom Elements
 */
const gameBoard = document.querySelector('.board');
const modal = document.querySelector('#modal');
const game = document.querySelector('#game');


/*
 * Create a list that holds all of your cards
 */
let faItems = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];


/*
 * FUNCTIONS
 */

// Creating Deck HTML
function newGame(a) {
    start = Math.floor(performance.now()/1000);

    document.querySelector('.board').innerHTML = '';
    comparingList = [];
    matchedCards = 0;
    moveCount = 0;
    //chronometer 0
    //stars 0

    shuffle(faItems);
    var newDeck = document.createElement('container');
    newDeck.classList.add('deck');
    document.querySelector('#moveCount').innerHTML = moveCount;

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

function myTimer() {
	var end = Math.floor(performance.now()/1000);
    timeInterval = Math.floor(end - start);
    document.getElementById("timer").innerHTML = timeInterval + 's';
}

// LISTENERS
let comparingList = [];
let matchedCards = 0;
let moveCount = 0;
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
                            clearInterval(myVar);
                            modal.querySelector('#totalTime').innerHTML = timeInterval + 's';
                            if (moveCount > 8) {
                                modal.querySelector('.stars').children[2].classList.remove('active');
                                if (moveCount > 13) {
                                    modal.querySelector('.stars').children[1].classList.remove('active');
                                    if (moveCount > 21) {
                                        modal.querySelector('.stars').children[0].classList.remove('active');
                                    }
                                }
                            }

                            setTimeout(function () {
                                modal.style.display = 'block';
                                if (moveCount > 8) {
                                    modal.querySelector('.stars').children[0].classList.add = 'active';
                                }
                                modal.querySelector('.restart').addEventListener('click', function () {
                                    document.querySelector('#modal').style.display = 'none';
                                    newGame(gameBoard);
                                })
                            }, 300)
                        }
                    },400)
                }else{
                    moveCount++;
                    setTimeout(function () {
                        firstCard.classList.remove('open');
                        secondCard.classList.remove('open');
                    },400)

                    if (moveCount > 8) {
                        game.querySelector('.stars').children[2].classList.remove('active');
                        if (moveCount > 13) {
                            game.querySelector('.stars').children[1].classList.remove('active');
                            if (moveCount > 21) {
                                game.querySelector('.stars').children[0].classList.remove('active');
                            }
                        }
                    }
                    document.querySelector('#moveCount').innerHTML = moveCount;
                }
                comparingList = [];
            }
        }
    }
})

document.querySelector('.restart').addEventListener('click', newGame)

document.querySelector('.close').addEventListener('click', function () {
    document.querySelector('#modal').style.display = 'none';
})

newGame();
