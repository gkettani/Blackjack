
export default class player{
    constructor()
    {
        this.coins = 0;
        this.cards = [];
        this.points = 0;
    }

    updatePoints(){
        this.points = 0;
        this.cards.forEach( card => {
            this.points += card.value;
        })
    }
}