import Dealer from "./modules/dealer.js";
import Deck from "./modules/deck.js";
import Player from "./modules/player.js";

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
const coinsDiv = document.querySelector('#player-coins');
const playerCoins = document.querySelector('#money');
const mainDeck = document.querySelector('#main-deck');
const betCoins = document.querySelector('#bet-coins');
const playerPoints = document.querySelector('#player-points');
const playerPointsValue = Array.from(playerPoints.children);
const dealerPoints = document.querySelector('#dealer-points');
const dealerPointsValue = Array.from(dealerPoints.children);

let isFinished = true;
let offset = 50;
let betValue = 0;
let counter = 0;
let deck = new Deck();
let player = new Player();
let dealer = new Dealer();
let playTimerId;
let winnerTimer;

function add(){
    if (betValue < 950 && isFinished && betValue+offset <= player.coins)
    {
        betValue += offset;
        betCoins.innerText = '$ ' + betValue;
        betCoins.style.textAlign =  'center';
    }
}

function substract(){
    if(betValue >= offset && isFinished)
    {
        betValue-=offset;
        betCoins.innerText = '$ ' + betValue;
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

function toggleBetScreen(){
    hitBtn.classList.add('invisible');
    doubleBtn.classList.add('invisible');
    standBtn.classList.add('invisible');
    betBtn.classList.remove('invisible');
    plusBtn.classList.remove('disabled-btn');
    minusBtn.classList.remove('disabled-btn');
    playerPoints.classList.add('invisible');
    dealerPoints.classList.add('invisible');
    betCoins.innerText = '$ 0';
}

function togglePlayScreen(){
    betBtn.classList.add('invisible');
    playerPoints.classList.remove('invisible');
    dealerPoints.classList.remove('invisible');
    plusBtn.classList.add('disabled-btn');
    minusBtn.classList.add('disabled-btn');
    hitBtn.classList.remove('invisible');
    doubleBtn.classList.remove('invisible');
    standBtn.classList.remove('invisible');
}

function distributeCards(){
    deck.shuffle();
    player.cards.push(deck.cards[counter]);
    counter++;
    dealer.cards.push(deck.cards[counter]);
    counter++;
    player.cards.push(deck.cards[counter]);
    counter++;
    betBtn.classList.add('invisible');
}

function appendCards(){
    player.cards.forEach( card => {
        card.appendCard(gameScreen);
    });
    dealer.cards.forEach( card  => {
        card.appendCard(gameScreen);
    });
}

function updateScreen(){
    player.cards.forEach( (card, index) => {
        card.setPosition(500 +index*120, 400);
    });
    dealer.cards.forEach( (card, index) => {
        card.setPosition(500 +index*120, 200);
    });
}

function updatePoints(){
    player.updatePoints();
    playerPointsValue[0].innerText = player.points;
    dealer.updatePoints();
    dealerPointsValue[0].innerText = dealer.points;
    
}

function playerDrawCard(){
    player.cards.push(deck.cards[counter]);
    counter++;
    updatePoints();
    appendCards();
    updateScreen();
}

function dealerDrawCard(){
    dealer.cards.push(deck.cards[counter]);
    counter++;
    updatePoints();
    appendCards();
    updateScreen();
}

function startGame(){
    if(betValue != 0)
    {
        isFinished = false;
        player.coins -= betValue;
        playerCoins.innerText = '$ ' + player.coins;
        togglePlayScreen(); 
        distributeCards();
        appendCards();
        updatePoints();
        updateScreen();
    }
}

function stand(){
    isFinished = true;
    playTimerId = setInterval(() => {
        if(dealer.points < 17)
        {
            dealerDrawCard();
        }
        else{
            clearInterval(playTimerId);
            checkWinner();
        }
    }, 1000);
}

function checkWinner(){
    winnerTimer = setInterval(() => {
    if(player.points <= 21 && (player.points > dealer.points || dealer.points > 21))
    {
        player.coins += 2*betValue;
        playerCoins.innerText = '$ ' + player.coins;
    }
    else if(player.points <= 21 && player.points == dealer.points)
    {
        player.coins += betValue;
        playerCoins.innerText = '$ ' + player.coins;
    }
    resetGame();
    clearInterval(winnerTimer);
    }, 1500);
    
}

function launchGame(){
    gameScreen.style.backgroundImage = 'url(../img/Background2.png)';
    minusBtn.classList.remove('invisible');
    plusBtn.classList.remove('invisible');
    betBtn.classList.remove('invisible');
    coinsDiv.classList.remove('invisible');
    mainDeck.classList.remove('invisible');
    betCoins.classList.remove('invisible');
    startBtn.classList.add('invisible');
    player.coins = 500;
    playerCoins.innerText = '$ ' + player.coins;
}

function resetGame(){
    player.cards.forEach(card => {
        card.removeVisual(gameScreen);
    });
    player.cards = [];
    dealer.cards.forEach(card => {
        card.removeVisual(gameScreen);
    });
    dealer.cards = [];
    betValue = 0;
    counter = 0;
    toggleBetScreen();
}

function debug(){
    console.log("");
}
 
screenBtn.addEventListener('click', toggleFullScreen)
soundBtn.addEventListener('click', debug)
plusBtn.addEventListener('click', add);
minusBtn.addEventListener('click', substract);
startBtn.addEventListener('click', launchGame);
betBtn.addEventListener('click', startGame);
standBtn.addEventListener('click', stand);
hitBtn.addEventListener('click', playerDrawCard);



