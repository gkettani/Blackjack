export default class Dealer{
    constructor()
    {
        this.points = 0;
        this.cards = [];
    }

    updatePoints(){
        this.points = 0;
        this.cards.forEach( card => {
            this.points += card.value;
        })
    }
}