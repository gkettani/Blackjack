import ElementHandler from "./modules/elementHandler.js";
import Game from './modules/game.js'

let elements = new ElementHandler();
let game = new Game(elements.gameScreen);

function playerDrawCard(){ 
    game.withdrawCard(game.player);
    game.update(elements);
    if(game.player.points > 21 ) checkWinner();
    if (game.player.points == 21) stand();
}

function dealerDrawCard(){ 
    game.withdrawCard(game.dealer);
    game.update(elements);
}

function startGame(){ 
    game.start();
    if( !game.isFinished){
        elements.setPlayerCoins(game.player.coins);
        elements.togglePlayScreen();
        game.update(elements);
        if (game.player.points == 21) stand();
    }
}

function stand(){
    elements.disablePlayBtn();
    let playTimerId = setInterval(() => {
        if(game.dealer.points < 17)
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
    elements.disablePlayBtn();
    elements.displayWinStatus(game.checkWinner());
    elements.setPlayerCoins(game.player.coins);
    let id = setInterval(() => {
        clearInterval(id);
        resetGame();
    }, 2000);
}

function resetGame(){  
    elements.setInvisisble(elements.endDiv);
    game.removeCards();
    game.init();
    elements.toggleBetScreen();
}

elements.betBtn.addEventListener('click', startGame);
elements.standBtn.addEventListener('click', stand);
elements.hitBtn.addEventListener('click', playerDrawCard);

elements.startBtn.addEventListener('click', () => {
    elements.init();
    game.player.coins = 500;
});

elements.screenBtn.addEventListener('click', () => {
    elements.toggleFullScreen();
});

elements.plusBtn.addEventListener('click', () =>{
    let value = game.betValue;
    value += game.offset;
    game.setBetValue(value);
    elements.setBetValue(game.betValue);
});

elements.minusBtn.addEventListener('click', () => {
    let value = game.betValue;
    value -= game.offset;
    game.setBetValue(value);
    elements.setBetValue(game.betValue);
});
