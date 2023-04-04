const cards = document.querySelectorAll('.card');
let flippedCards = [];
let firstCard = null;
let secondCard = null;

cards.forEach(card => {
    card.addEventListener('click', () => { //Espera clicar em algum card
        
        const randomNum = Math.floor(Math.random() * 8) + 1;
        const img = card.querySelector("img");
        
        if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
            if (!firstCard) {
                firstCard = card;
                card.classList.add("flipped");
                img.src = `img/${randomNum}.gif`;
                flippedCards.push(card);
            }
            else if (!secondCard) {
                secondCard = card;
                card.classList.add("flipped");
                img.src = `img/${randomNum}.gif`;
                flippedCards.push(card);
            }
            
            if (flippedCards.length === 2) {
                const firstCardImg = flippedCards[0].querySelector("img").src;
                const secondCardImg = flippedCards[1].querySelector("img").src;
                
                if (firstCardImg === secondCardImg) {
                    flippedCards.forEach(card => {
                        card.removeEventListener("click");
                    });
                    firstCard = null;
                    secondCard = null;
                    flippedCards = [];
                } else {
                    setTimeout(() => {
                        flippedCards.forEach(card => {
                            card.classList.remove("flipped");
                            card.querySelector("img").src = "img/back.png";
                        });
                        flippedCards = [];
                        firstCard = null;
                        secondCard = null;
                    }, 1000);
                }
            }
        } else if (card.classList.contains("flipped")) {
            card.classList.remove("flipped");
            img.src = "img/back.png";
            flippedCards.splice(flippedCards.indexOf(card), 1);
        }
    });
});

