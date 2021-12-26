export default class Card{
    constructor(rank, suit)
    {
        this.rank = rank;
        this.suit = suit;
        this.image = "url( ../../img/cards/" + rank + '_' + suit + ".svg)";
    }

    print(){
        console.log(this.rank+ " , "+ this.suit)
    }

}