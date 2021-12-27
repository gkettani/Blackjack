
import Player from './player.js'
import Deck from './deck.js'
import Dealer from './dealer.js'

export default class game{

    constructor(gameScreen){
        this.player = new Player();
        this.dealer = new Dealer();
        this.deck = new Deck();
        this.counter = 0;
        this.isFinished = true;
        this.betValue = 0;
        this.gameScreen = gameScreen;
        this.offset = 50;
    }

    init(){
        this.player.cards = [];
        this.dealer.cards = [];
        this.counter = 0;
        this.betValue = 0;
        this.updatePoints();
    }

    distributeCards(){
        this.deck.shuffle();
        this.player.cards.push(this.deck.cards[this.counter]);
        this.counter++;
        this.dealer.cards.push(this.deck.cards[this.counter]);
        this.counter++;
        this.player.cards.push(this.deck.cards[this.counter]);
        this.counter++;
    }

    updatePoints(){
        this.player.updatePoints();
        this.dealer.updatePoints();
    }

    withdrawCard(player){
        player.cards.push(this.deck.cards[this.counter]);
        this.counter++;
    }

    start(){
        if(this.betValue != 0)
        {
            this.isFinished = false;
            this.player.coins -= this.betValue;
            this.distributeCards();
        }
    }

    setBetValue(value){
        if( value >= 0 && value < 1000 
        && this.isFinished && value <= this.player.coins)
        {
            this.betValue = value;
        }
    }

    checkWinner(){
        this.isFinished = true;
        if(this.player.points <= 21 &&
        (this.player.points > this.dealer.points || this.dealer.points > 21))
        {
            this.player.coins += 2*this.betValue;
            return 'Victory';
        }
        else if(this.player.points <= 21 && this.player.points == this.dealer.points)
        {
            this.player.coins += this.betValue;
            return 'Tie';
        }
        else{
            return 'Defeat';
        }
    }

    removeCards(){
        this.player.cards.forEach(card => {
            card.removeVisual(this.gameScreen);
        });
        this.dealer.cards.forEach(card => {
            card.removeVisual(this.gameScreen);
        });
    }

    appendCards(){
        this.player.cards.forEach( card => {
            card.appendCard(this.gameScreen); 
        });
        this.dealer.cards.forEach( card  => {
            card.appendCard(this.gameScreen);  
        });
    }

    updateScreen(){
        this.player.cards.forEach( (card, index) => {
            card.setPosition(
                (583 - 50*( 1 + 2*index - this.player.cards.length))*100/1280,
                 60.97);
        });
        this.dealer.cards.forEach( (card, index) => {
            card.setPosition(
                (583 - 50*( 1 + 2*index - this.dealer.cards.length))*100/1280,
                 4.45);
        });
    }

    update(elements){
        this.updatePoints();
        this.appendCards();
        this.updateScreen();
        elements.setPlayerPoints(this.player.points);
        elements.setDealerPoints(this.dealer.points);
    }

}