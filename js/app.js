/*
 * Dom Elements
 */
const gameBoard = document.querySelector('.gameBoard')


/*
 * Create a list that holds all of your cards
 */
let faItems = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];


/*
 * FUNCTIONS
 */

// Creating Deck HTML
function newGame(a) {
    shuffle(faItems);
    var newDeck = document.createElement('container');
    newDeck.classList.add('deck');

	for (var i = 0; i < faItems.length; i++) {
		var newCard = document.createElement('div');
        var back = document.createElement('div');
        newCard.classList.add('card');
        newCard.id = i + 1;
		back.classList.add('back', 'fa', faItems[i]);
		newCard.append(back);
        newDeck.append(newCard);
	}

    a.append(newDeck);
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

// Click Listener
let comparingList = [];
gameBoard.addEventListener('click', function (e) {
    if (e.target.id !== comparingList[0] && !(e.target.classList.contains('back')) && !(e.target.classList.contains('deck'))) {
        e.target.classList.add('open');
        comparingList.push(e.target.id);
        if (comparingList[0]) {
            if (comparingList[1]) {
                const firstCard = document.getElementById(comparingList[0]);
                const secondCard = document.getElementById(comparingList[1]);
                if (firstCard.querySelector('.back').classList[2] == secondCard.querySelector('.back').classList[2]) {
                    firstCard.classList.add('match');
                    secondCard.classList.add('match');
                }else{
                    setTimeout(function () {
                        firstCard.classList.remove('open');
                        secondCard.classList.remove('open');
                    },400)
                }
                comparingList = [];
            }
        }
    }
})

newGame(gameBoard);
