export default class Dealer{
    constructor()
    {
        this.points = 0;
        this.cards = [];
        this.aceNum = 0;
        this.cardTop = 4.45;
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