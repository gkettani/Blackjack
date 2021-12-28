export default class Dealer{
    constructor()
    {
        this.points = 0;
        this.cards = [];
        this.aceNum = 0; // The number of aces the dealer has (aces are valued either 1 or 11)
        this.cardTop = 4.45; // Set the top edge of the positioned card 4.45% down 
    }

    updatePoints(){
        this.points = 0;
        this.aceNum = 0;
        this.cards.forEach( card => {
            this.points += card.value;
            if(card.value === 11 ) this.aceNum++;
        });
        while (this.aceNum > 0 && this.points > 21) {
            this.points -= 10 
            this.aceNum--;
        }
    }
}