export default class elementHandler{
    /* This class handles all the visual elements of the index.html file */

    constructor(){
        this.gameScreen = document.querySelector('.game-board');
        this.startBtn = document.querySelector('#start-btn');
        this.minusBtn = document.querySelector('#minus-btn');
        this.plusBtn = document.querySelector('#plus-btn');
        this.betBtn = document.querySelector('#bet-btn');
        this.soundBtn = document.querySelector('#sound-btn');
        this.soundIcon = Array.from(this.soundBtn.children);
        this.screenBtn = document.querySelector('#screen-btn');
        this.standBtn = document.querySelector('#stand-btn');
        this.hitBtn = document.querySelector('#hit-btn');
        this.doubleBtn = document.querySelector('#double-btn');
        this.coinsDiv = document.querySelector('#player-coins');
        this.playerCoins = document.querySelector('#money');
        this.mainDeck = document.querySelector('#main-deck');
        this.betCoins = document.querySelector('#bet-coins');
        this.playerPoints = document.querySelector('#player-points');
        this.playerPointsValue = Array.from(this.playerPoints.children);
        this.dealerPoints = document.querySelector('#dealer-points');
        this.dealerPointsValue = Array.from(this.dealerPoints.children);
        this.endDiv = document.querySelector('#end-game');
        this.endText = Array.from(this.endDiv.children);
        this.currencyFormatter = new Intl.NumberFormat("en-us", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0
        });
    }

    init(){
        this.gameScreen.style.backgroundImage = 'url(../img/Background2.png)';
        this.minusBtn.classList.remove('invisible');
        this.plusBtn.classList.remove('invisible');
        this.betBtn.classList.remove('invisible');
        this.coinsDiv.classList.remove('invisible');
        this.mainDeck.classList.remove('invisible');
        this.betCoins.classList.remove('invisible');
        this.startBtn.classList.add('invisible');
        this.playerCoins.innerText = this.currencyFormatter.format( 500);
    }

    setBetValue(value){
        this.betCoins.innerText = '$ ' + value; 
    }

    toggleBetScreen(){
        this.hitBtn.classList.add('invisible');
        this.doubleBtn.classList.add('invisible');
        this.standBtn.classList.add('invisible');
        this.betBtn.classList.remove('invisible');
        this.plusBtn.classList.remove('disabled-btn');
        this.minusBtn.classList.remove('disabled-btn');
        this.playerPoints.classList.add('invisible');
        this.dealerPoints.classList.add('invisible');
        this.betCoins.innerText = this.currencyFormatter.format(0);
    }

    togglePlayScreen(){
        this.standBtn.classList.remove('disabled-btn');
        this.doubleBtn.classList.remove('disabled-btn');
        this.hitBtn.classList.remove('disabled-btn');
        this.betBtn.classList.add('invisible');
        this.playerPoints.classList.remove('invisible');
        this.dealerPoints.classList.remove('invisible');
        this.plusBtn.classList.add('disabled-btn');
        this.minusBtn.classList.add('disabled-btn');
        this.hitBtn.classList.remove('invisible');
        this.doubleBtn.classList.remove('invisible');
        this.standBtn.classList.remove('invisible');
    }

    toggleFullScreen() {
        if (!document.fullscreenElement) {
            this.gameScreen.requestFullscreen();
        } 
        else if (document.exitFullscreen)
        {
            document.exitFullscreen();
        }
    }

    disablePlayBtn(){
        this.standBtn.classList.add('disabled-btn');
        this.doubleBtn.classList.add('disabled-btn');
        this.hitBtn.classList.add('disabled-btn');
    }

    setVisisble(element){
        element.classList.remove('invisible');
    }

    setInvisisble(element){
        element.classList.add('invisible');
    }

    setPlayerPoints(value){
        this.playerPointsValue[0].innerText = value;
    }

    setPlayerCoins(value){
        this.playerCoins.innerText = this.currencyFormatter.format( value);
    }

    setDealerPoints(value){
        this.dealerPointsValue[0].innerText = value;
    }

    displayWinStatus(status){
        this.setVisisble(this.endDiv);
        this.endText[0].innerText = status;
    }

    changeSoundIcon(soundOn){
        if (soundOn) this.soundIcon[0].src = '../img/sound.svg';
        else this.soundIcon[0].src = '../img/soundOff.png';
    }

}