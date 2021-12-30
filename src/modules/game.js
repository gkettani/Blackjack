
import Player from './player.js'
import Deck from './deck.js'
import Dealer from './dealer.js'

export default class game{

    constructor(gameScreen){
        this.player = new Player();
        this.dealer = new Dealer();
        this.deck = new Deck();
        this.counter = 0; // the number of cards than has been distributed
        this.isFinished = true; // whether the game is finished or not
        this.betValue = 0; 
        this.gameScreen = gameScreen; // The main screen on which visual elements are displayed
        this.offset = 50; // The increment of betValue
        this.hasDoubled = false; //tells whether the player has doubled his bet or not
    }

    init(){
        this.player.cards = [];
        this.dealer.cards = [];
        this.counter = 0;
        this.betValue = 0;
        this.hasDoubled = false;
        this.updatePoints();
        if( this.player.coins === 0) this.player.coins = 500;
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
        if( value >= 0 && this.isFinished && value <= this.player.coins)
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
        /* removes the displayed cards from the screen */
        this.player.cards.forEach(card => {
            card.removeVisual(this.gameScreen);
        });
        this.dealer.cards.forEach(card => {
            card.removeVisual(this.gameScreen);
        });
    }

    appendCards(){
        /* add the cards to the screen */
        this.player.cards.forEach( card => {
            card.appendCard(this.gameScreen); 
        });
        this.dealer.cards.forEach( card  => {
            card.appendCard(this.gameScreen);  
        });
    }

    updateScreen(dt, player){
        /* Set the position of the cards 
        @param dt is for the animation effect
        @param player tells whether we update the player's or dealer's cards */
        player.cards.forEach( (card, index) => {
            card.setPosition(
                (dt - 50*( 1 + 2*index - player.cards.length))*100/1280,
                player.cardTop);
        });
    }

    update(elements, player){
        this.updatePoints();
        this.appendCards();
        let dt = 550;
        let timer = setInterval(() => {
            dt+=5;
            this.updateScreen(dt, player);
            if (dt >= 583) clearInterval(timer);
        }, 70);
        elements.setPlayerPoints(this.player.points);
        elements.setDealerPoints(this.dealer.points);
    }

    double(){
        /* This method is called when the player want 
        to double his initial bet 
        @return whether the player can double or not*/
        if( this.player.coins >= this.betValue){
            this.player.coins -= this.betValue;
            this.betValue *= 2;
            this.hasDoubled = true;
        }
        return this.hasDoubled;
    }
}