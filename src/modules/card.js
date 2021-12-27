export default class Card{
    constructor(rank, suit)
    {
        this.rank = rank;
        this.suit = suit;
        this.image = "url( ../../img/cards/" + rank + '_' + suit + ".svg)";
        this.visual = document.createElement('div');
        this.visual.classList.add('card');
        this.visual.style.backgroundImage = this.image;
        this.value = 11;
        if( this.rank != 1) this.value = (this.rank <10) ? rank : 10;
    }

    print(){
        console.log(this.rank+ " , "+ this.suit)
    }

    setPosition(xPos, yPos){
        this.visual.style.left = xPos + '%';
        this.visual.style.top = yPos + '%';
    }

    appendCard(parent){
        parent.appendChild(this.visual);
    }

    removeVisual(parent){
        parent.removeChild(this.visual);
    }

}