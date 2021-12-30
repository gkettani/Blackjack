import ElementHandler from "./modules/elementHandler.js";
import Game from './modules/game.js'
import SoundEffect from './modules/soundEffects.js'

let elements = new ElementHandler();
let game = new Game(elements.gameScreen);
let soundOn = true;
let bgMusic = new SoundEffect('../audio/bm.mp3');
let cardSoundEffect = new SoundEffect('../audio/cardFlip.mp3');

function playerDrawCard(){ 
    /* when a player withdraw a card we add it to his cards array and
     update his points and the screen so we can see the new card and updated points*/
    game.withdrawCard(game.player);
    game.update(elements, game.player);
    cardSoundEffect.play();
    if(game.player.points > 21 ) checkWinner();
    else if (game.player.points == 21 || game.hasDoubled) stand();
}

function dealerDrawCard(){ 
    /* when the dealer withdraw a card we add it to his cards array and
     update his points and the screen so we can see the new card and updated points*/
    game.withdrawCard(game.dealer);
    game.update(elements, game.dealer);
    cardSoundEffect.play();
}

function startGame(){ 
    /*Main function that start a new game */
    game.start();
    if( !game.isFinished){
        elements.setPlayerCoins(game.player.coins);
        elements.togglePlayScreen();
        game.update(elements, game.player);
        game.update(elements, game.dealer);
        cardSoundEffect.play();
        if (game.player.points == 21) stand();
    }
}

function stand(){
    /* When the player stand the dealer start withdrawind cards until 
    his points are greater than 17 then we check the winner */
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
    /* the function game.checkWinner() return whether the player won or lost
    or if its a tie then we display the information on the screen */
    elements.disablePlayBtn();
    elements.displayWinStatus(game.checkWinner());
    elements.setPlayerCoins(game.player.coins);
    let id = setInterval(() => {
        clearInterval(id);
        resetGame();
    }, 2500);
}

function resetGame(){  
    /*Reset all the parameters and the screen and display the bet screen  */
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
    let {betValue} = game;
    betValue += game.offset;
    game.setBetValue(betValue);
    elements.setBetValue(game.betValue);
});

elements.minusBtn.addEventListener('click', () => {
    let {betValue} = game;
    betValue -= game.offset;
    game.setBetValue(betValue);
    elements.setBetValue(game.betValue);
});
