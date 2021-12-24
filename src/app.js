import Deck from "./modules/deck.js"
document.addEventListener('DOMContentLoaded', () =>{

    const gameScreen = document.querySelector('.game-board');
    const btn = document.createElement('button');
    btn.classList.add('btn');
    btn.innerText = 'Click';
    gameScreen.appendChild(btn);


    function showCard()
    {
        deck.shuffle();
        // let card = deck.cards[0];
        let img = document.createElement('div');
        img.classList.add('card');
        img.style.backgroundImage = "url(./img/card.png)";
        gameScreen.appendChild(img);

    }


    btn.addEventListener('click', showCard);
    

});
let deck = new Deck();
console.log(deck.cards[0]);
console.log('Shuffled :');
deck.shuffle();
console.log(deck.cards[0]);


