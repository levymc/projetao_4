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
    let time = 0;
    let tempo = function(){
        time++
        console.log(time);
    }
    let intervalId = setInterval(tempo, 1000);

    btnRestart.style.opacity = "1";
    let numCartas;
    do {
    numCartas = prompt("Com quantas cartas você quer jogar? Insira um número par entre 4 e 14:");
    } while (numCartas % 2 !== 0 || numCartas < 4 || numCartas > 14);


    const tableDiv = document.querySelector('.table');
    let contador = 1;

    for (let i = 0; i < numCartas/2; i++) {
        const newCard1 = `<div data-test="card" class="card"><img src="./img/back.png" data-test="face-down-image" data-name="${contador}" data-position="${contador*2}"></div>`;
        const newCard2 = `<div data-test="card" class="card"><img src="./img/back.png" data-test="face-down-image" data-name="${contador}" data-position="${contador*4}"></div>`;
        tableDiv.insertAdjacentHTML('beforeend', newCard1);
        tableDiv.insertAdjacentHTML('beforeend', newCard2);
        contador ++;
    }

    const cards = document.querySelectorAll('.card');
    let cartasViradas = [];
    let firstCard = null;
    let secondCard = null;
    let numJogadas = 0;

    cards.forEach(card => { // card é cada card dentro de cards
        card.addEventListener('click', () => { // espera clicar em algum card
            const img = card.querySelector("img");
            numJogadas++;
                
            if (cartasViradas.length < 2 && !card.classList.contains("flipped")) {
            if (!firstCard) { // se ainda nao existir primeira card
                firstCard = card;
                card.classList.add("flipped");
                if (!card.dataset.img) { // confere se a card ja foi virada
                    let num = Math.floor(Math.random() * numCartas) + 1
                    if (num == 0){
                        num = Math.floor(Math.random() * numCartas) + 1;
                    }
                    card.dataset.img = `img/${num}.gif`; 
                }
                img.src = card.dataset.img;
                img.setAttribute('data-test', 'face-up-image');
                cartasViradas.push(card);
            }
            else if (!secondCard) {
                secondCard = card;
                card.classList.add("flipped");
                if (!card.dataset.img) { // confere se a card ja foi virada
                    let num = Math.floor(Math.random() * numCartas)+ 1
                    if (num == 0){
                        num = Math.floor(Math.random() * numCartas) + 1;
                    }
                    card.dataset.img = `img/${num}.gif`; 
                }
                img.src = card.dataset.img;
                img.setAttribute('data-test', 'face-up-image');
                cartasViradas.push(card);
            }
            
            if (cartasViradas.length === 2) {
                const firstCardImg = cartasViradas[0].querySelector("img").src;
                const secondCardImg = cartasViradas[1].querySelector("img").src;
                        
                if (firstCardImg == secondCardImg) { // ganhou
                    clearInterval(intervalId);
                    alert(`Você ganhou em ${numJogadas/2} jogadas!`);
                    setTimeout(() => {
                        reiniciarJogo();
                    }, 1000); // espera 1sg
                    // alert("AEEE");
                    // cartasViradas.forEach(card => {
                    //     card.removeEventListener("click");
                    // });
                    firstCard = null;
                    secondCard = null;
                    cartasViradas = [];
                } else { // cartas nao iguais
                    setTimeout(() => {
                        cartasViradas.forEach(card => {
                            card.classList.remove("flipped");
                            card.querySelector("img").src = "img/back.png";
                        });
                        cartasViradas = [];
                        firstCard = null;
                        secondCard = null;
                    }, 1000); // espera 1sg
                }
            }
            }else if (card.classList.contains("flipped")) {
                card.classList.remove("flipped");
                img.src = "img/back.png";
                cartasViradas.splice(cartasViradas.indexOf(card), 1);
            }
        });
    });
}


// const cards = document.querySelectorAll('.card'); // Seleciona todos os elementos com a classe "card"
// numCartas = prompt("Com quantas cartas você quer jogar? Insira um número par entre 4 e 14:");
// let flippedCards = [];

// cards.forEach(card => {
//     card.addEventListener('click', () => {
        
//         const randomNum = Math.floor(Math.random() * numCartas/2) + 1;
//         const img = card.querySelector("img");
        
//         if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
//             card.classList.add("flipped");
//             img.src = `img/${randomNum}.gif`;
//             flippedCards.push(card);
            
//             if (flippedCards.length === 2) {
//                 const firstCardImg = flippedCards[0].querySelector("img").src;
//                 const secondCardImg = flippedCards[1].querySelector("img").src;
                
//                 if (firstCardImg === secondCardImg) {
//                     flippedCards.forEach(card => {
//                         card.removeEventListener("click");
//                     });
//                     flippedCards = [];
//                 } else {
//                     setTimeout(() => {
//                         flippedCards.forEach(card => {
//                             card.classList.remove("flipped");
//                             card.querySelector("img").src = "img/back.png";
//                         });
//                         flippedCards = [];
//                     }, 1000);
//                 }
//             }
//         } else if (card.classList.contains("flipped")) {
//             card.classList.remove("flipped");
//             img.src = "img/back.png";
//             flippedCards.splice(flippedCards.indexOf(card), 1);
//         }
//     });
// });
