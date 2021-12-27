import Dealer from "./modules/dealer.js";
import Deck from "./modules/deck.js";
import ElementHandler from "./modules/elementHandler.js";
import Player from "./modules/player.js";

let isFinished = true;
let offset = 50;
let betValue = 0;
let counter = 0;
let deck = new Deck();
let player = new Player();
let dealer = new Dealer();
let elements = new ElementHandler();
const gameScreen = elements.gameScreen;
let playTimerId;

function add(){
    if (betValue < 950 && isFinished && betValue+offset <= player.coins)
    {
        betValue += offset;
        elements.setBetValue(betValue);
    }
}

function substract(){
    if(betValue >= offset && isFinished)
    {
        betValue-=offset;
        elements.setBetValue(betValue);
    }
}

function toggleFullScreen() {
    elements.toggleFullScreen();
}

function distributeCards(){
    deck.shuffle();
    player.cards.push(deck.cards[counter]);
    counter++;
    dealer.cards.push(deck.cards[counter]);
    counter++;
    player.cards.push(deck.cards[counter]);
    counter++;
    elements.setInvisisble(elements.betBtn);
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
        card.setPosition((583 + 60*( 1 + 2*index - player.cards.length))*100/1280, 60.97);
    });
    dealer.cards.forEach( (card, index) => {
        card.setPosition((583 + 60*( 1 + 2*index - dealer.cards.length))*100/1280, 4.45);
    });
}

function updatePoints(){
    player.updatePoints();
    elements.setPlayerPoints(player.points);
    dealer.updatePoints();
    elements.setDealerPoints(dealer.points);
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
        elements.setPlayerCoins(player.coins);
        elements.togglePlayScreen(); 
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
    }, 500);
    
}

function checkWinner(){
    if(player.points <= 21 && (player.points > dealer.points || dealer.points > 21))
    {
        player.coins += 2*betValue;
        elements.displayWinStatus('Victory');
    }
    else if(player.points <= 21 && player.points == dealer.points)
    {
        player.coins += betValue;
        elements.displayWinStatus('Tie');
    }
    else{
        elements.displayWinStatus('Defeat');
    }
    elements.setPlayerCoins(player.coins);
    let id = setInterval(() => {
        clearInterval(id);
        resetGame();
    }, 2000);
}

function launchGame(){
    elements.init();
    player.coins = 500;
}

function resetGame(){
    elements.setInvisisble(elements.endDiv);
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
    elements.toggleBetScreen();
}

elements.screenBtn.addEventListener('click', toggleFullScreen);
// soundBtn.addEventListener('click', debug)
elements.plusBtn.addEventListener('click', add);
elements.minusBtn.addEventListener('click', substract);
elements.startBtn.addEventListener('click', launchGame);
elements.betBtn.addEventListener('click', startGame);
elements.standBtn.addEventListener('click', stand);
elements.hitBtn.addEventListener('click', playerDrawCard);



