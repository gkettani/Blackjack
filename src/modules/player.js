
export default class player{
    constructor()
    {
        this.coins = 0;
        this.cards = [];
        this.points = 0;
        this.aceNum = 0;
        this.cardTop = 60.97;
    }

    updatePoints(){
        this.points = 0;
        this.aceNum = 0;
        this.cards.forEach( card => {
            this.points += card.value;
            if(card.value === 11 ) this.aceNum ++;
        });
        while (this.aceNum>0 && this.points > 21) {
            this.points -= 10 
            this.aceNum--;
        }
    }
}