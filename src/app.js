import ElementHandler from "./modules/elementHandler.js";
import Game from './modules/game.js'
import SoundEffect from './modules/soundEffects.js'

let elements = new ElementHandler();
let game = new Game(elements.gameScreen);
let soundOn = true;
let bgMusic = new SoundEffect('../audio/bm.mp3');
let cardSoundEffect = new SoundEffect('../audio/cardFlip.mp3');
let hasDoubled = false;

function playerDrawCard(){ 
    game.withdrawCard(game.player);
    game.update(elements, game.player);
    cardSoundEffect.play();
    if(game.player.points > 21 ) checkWinner();
    if (game.player.points == 21 || hasDoubled) stand();
}

function dealerDrawCard(){ 
    game.withdrawCard(game.dealer);
    game.update(elements, game.dealer);
    cardSoundEffect.play();
}

function startGame(){ 
    game.start();
    if( !game.isFinished){
        hasDoubled = false;
        elements.setPlayerCoins(game.player.coins);
        elements.togglePlayScreen();
        game.update(elements, game.player);
        game.update(elements, game.dealer);
        cardSoundEffect.play();
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
    }, 2500);
}

function resetGame(){  
    elements.setInvisisble(elements.endDiv);
    game.removeCards();
    game.init();
    elements.setPlayerCoins(game.player.coins);
    elements.toggleBetScreen();
}

elements.soundBtn.addEventListener('click', () => {
    if(soundOn){
        soundOn = false;
        bgMusic.stop();
    }
    else{
        soundOn = true;
        bgMusic.play();
    }
    elements.changeSoundIcon(soundOn);
});
elements.doubleBtn.addEventListener('click', () => {
    if( game.double()){
        hasDoubled = true;
        playerDrawCard();
    }
});
elements.betBtn.addEventListener('click', startGame);
elements.standBtn.addEventListener('click', stand);
elements.hitBtn.addEventListener('click', playerDrawCard);

elements.startBtn.addEventListener('click', () => {
    elements.init();
    game.player.coins = 500;
    if(soundOn) bgMusic.play();
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
