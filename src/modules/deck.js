import Card from "./card.js";

export default class deck {
    // this class creates a deck of 52 cards
    constructor()
    {
        this.cards = [];
        this.backCard = new Card(0, 'back');
        for(let i=1; i<14; i++)
        {
            this.cards.push(new Card(i, "spade"));
            this.cards.push(new Card(i, "diamond"));
            this.cards.push(new Card(i, "heart"));
            this.cards.push(new Card(i, "club"));
        }
    }

    shuffle(){
        for(let i=0; i<52; i++)
        {
            let num = Math.floor(Math.random()*52);
            let card = this.cards[i];
            this.cards[i] = this.cards[num];
            this.cards[num] = card;
        }
    }
}