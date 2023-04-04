document.addEventListener('DOMContentLoaded', () => {
    jogo();
  });

const btnRestart = document.querySelector('#btn-restart');

btnRestart.addEventListener('click', reiniciarJogo);

function reiniciarJogo() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.remove());
    jogo()
}

function jogo(){
    btnRestart.style.opacity = "1";
    let numCartas;
    do {
    numCartas = prompt("Com quantas cartas você quer jogar? Insira um número par entre 4 e 14:");
    } while (numCartas % 2 !== 0 || numCartas < 4 || numCartas > 14);


    const tableDiv = document.querySelector('.table');
    let contador = 1;

    for (let i = 0; i <= numCartas; i++) {
    const newCard1 = `<div data-test="card" class="card"><img src="./img/back.png" data-test="face-down-image" data-name="${contador}" data-position="${contador*2}"></div>`;
    const newCard2 = `<div data-test="card" class="card"><img src="./img/back.png" data-test="face-down-image" data-name="${contador}" data-position="${contador*4}"></div>`;
    tableDiv.insertAdjacentHTML('beforeend', newCard1);
    tableDiv.insertAdjacentHTML('beforeend', newCard2);
    contador ++;
    }

    const cards = document.querySelectorAll('.card');
    let flippedCards = [];
    let firstCard = null;
    let secondCard = null;

    cards.forEach(card => {
    // Obtem a posição de cada carta
    const cardRect = card.getBoundingClientRect();
    const cardInfo = {
        top: cardRect.top,
        left: cardRect.left,
        right: cardRect.right,
        bottom: cardRect.bottom
    };
    
    card.addEventListener('click', () => { //Espera clicar em algum card
        const img = card.querySelector("img");
            
        if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
        if (!firstCard) {
            firstCard = card;
            card.classList.add("flipped");
            // Adiciona imagem aleatória apenas se a carta ainda não foi revelada antes
            if (!card.dataset.img) {
                card.dataset.img = `img/${Math.floor(Math.random() * 8) + 1}.gif`;
            }
            img.src = card.dataset.img;
            img.setAttribute('data-test', 'face-up-image');
            flippedCards.push(card);
        }
        else if (!secondCard) {
            secondCard = card;
            card.classList.add("flipped");
            // Adiciona imagem aleatória apenas se a carta ainda não foi revelada antes
            if (!card.dataset.img) {
            card.dataset.img = `img/${Math.floor(Math.random() * 8) + 1}.gif`;
            }
            img.src = card.dataset.img;
            img.setAttribute('data-test', 'face-up-image');
            flippedCards.push(card);
        }
        
        if (flippedCards.length === 2) {
            const firstCardImg = flippedCards[0].querySelector("img").src;
            const secondCardImg = flippedCards[1].querySelector("img").src;
                    
            if (firstCardImg == secondCardImg) {
                setTimeout(() => {
                    reiniciarJogo;
                }, 1000);
                alert("AEEE");
                // flippedCards.forEach(card => {
                //     card.removeEventListener("click");
                // });
                // firstCard = null;
                // secondCard = null;
                // flippedCards = [];
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
}
