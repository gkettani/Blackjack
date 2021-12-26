import Deck from "./modules/deck.js"
const gameScreen = document.querySelector('.game-board');
const startBtn = document.querySelector('#start-btn');
const minusBtn = document.querySelector('#minus-btn');
const plusBtn = document.querySelector('#plus-btn');
const betBtn = document.querySelector('#bet-btn');
const soundBtn = document.querySelector('#sound-btn');
const screenBtn = document.querySelector('#screen-btn');
const standBtn = document.querySelector('#stand-btn');
const hitBtn = document.querySelector('#hit-btn');
const doubleBtn = document.querySelector('#double-btn');
const playerCoins = document.querySelector('#player-coins');
const mainDeck = document.querySelector('#main-deck');
const betCoins = document.querySelector('#bet-coins');

let offset = 50;
let num = 0;
let cardVisual;
let deck = new Deck();
deck.shuffle();
let cards = [];
let cardsVisual = []


function showCard()
{
    let card = deck.cards[cards.length];
    cards.push(card);
    cardVisual = document.createElement('div');
    cardsVisual.push(cardVisual);
    cardVisual.classList.add('card');
    cardVisual.style.backgroundImage = card.image;
    cardVisual.style.left = 50 + 120*cardsVisual.length + 'px';
    gameScreen.appendChild(cardVisual);
}

function showItems(){
    gameScreen.style.backgroundImage = 'url(../img/Background2.png)';
    minusBtn.classList.remove('visible');
    plusBtn.classList.remove('visible');
    betBtn.classList.remove('visible');
    playerCoins.classList.remove('visible');
    mainDeck.classList.remove('visible');
    betCoins.classList.remove('visible');
    startBtn.classList.add('visible');
}

function add(){
    if (num < 950)
    {
        num += offset;
        betCoins.innerHTML = '$ ' + num;
        betCoins.style.textAlign =  'center';
    }
}

function remove(){
    if(num >= offset)
    {
        num-=offset;
        betCoins.innerHTML = '$ ' + num;
    }
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        gameScreen.requestFullscreen();
    } 
    else if (document.exitFullscreen)
    {
        document.exitFullscreen();
    }
}
    
screenBtn.addEventListener('click', toggleFullScreen)
plusBtn.addEventListener('click', add);
minusBtn.addEventListener('click', remove);
startBtn.addEventListener('click', showItems);
betBtn.addEventListener('click', showCard);



