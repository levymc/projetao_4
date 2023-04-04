let firstCard = null;
let secondCard = null;

const cards = document.querySelectorAll('td');

cards.forEach(card => {
    card.addEventListener('click', () => {
        if (!firstCard) {
            firstCard = card;
            firstCard.children[0].classList.add('visible');
        } else if (!secondCard) {
            secondCard = card;
            secondCard.children[0].classList.add('visible');
            
            if (firstCard.children[0].src === secondCard.children[0].src) {
                firstCard = null;
                secondCard = null;
            } else {
                setTimeout(() => {
                    firstCard.children[0].classList.remove('visible');
                    secondCard.children[0].classList.remove('visible');
                    firstCard = null;
                    secondCard = null;
                }, 1000);
            }
        }
    });
});
