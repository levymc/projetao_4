const cards = document.querySelectorAll('.card'); // Seleciona todos os elementos com a classe "card"

// function getRandomImage() {
//     const min = 1; // Número mínimo da imagem
//     const max = 8; // Número máximo da imagem
//     const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; // Gera um número aleatório entre 1 e 8
//     const imageName = randomNumber + '.png'; // Monta o nome do arquivo de imagem
//     return 'img/' + imageName; // Retorna o caminho completo da imagem
// }

// function flipCard() {
//     const randomImage = getRandomImage(); // Obtém um caminho aleatório de imagem
//     const cardImage = this.querySelector('img'); // Seleciona a imagem dentro do cartão atual
//     cardImage.setAttribute('src', randomImage); // Define o atributo "src" da imagem para o caminho aleatório
// }

// cards.forEach(card => {
//     card.addEventListener('click', flipCard); // Adiciona um ouvinte de eventos de clique para cada cartão
// });


let flippedCards = [];

cards.forEach(card => {
    card.addEventListener('click', () => {
        
        const randomNum = Math.floor(Math.random() * 8) + 1;
        const img = card.querySelector("img");
        
        if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
            card.classList.add("flipped");
            img.src = `img/${randomNum}.png`;
            flippedCards.push(card);
            
            if (flippedCards.length === 2) {
                const firstCardImg = flippedCards[0].querySelector("img").src;
                const secondCardImg = flippedCards[1].querySelector("img").src;
                
                if (firstCardImg === secondCardImg) {
                    flippedCards.forEach(card => {
                        card.removeEventListener("click");
                    });
                    flippedCards = [];
                } else {
                    setTimeout(() => {
                        flippedCards.forEach(card => {
                            card.classList.remove("flipped");
                            card.querySelector("img").src = "img/back.png";
                        });
                        flippedCards = [];
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
