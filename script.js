// let firstCard = null;
// let secondCard = null;

// const cards = document.querySelectorAll('td');

// cards.forEach(card => {
//     card.addEventListener('click', () => {
//         if (!firstCard) {
//             firstCard = card;
//             firstCard.children[0].classList.add('visible');
//         } else if (!secondCard) {
//             secondCard = card;
//             secondCard.children[0].classList.add('visible');
            
//             if (firstCard.children[0].src === secondCard.children[0].src) {
//                 firstCard = null;
//                 secondCard = null;
//             } else {
//                 setTimeout(() => {
//                     firstCard.children[0].classList.remove('visible');
//                     secondCard.children[0].classList.remove('visible');
//                     firstCard = null;
//                     secondCard = null;
//                 }, 1000);
//             }
//         }
//     });
// });

const cards = document.querySelectorAll('.card'); // Seleciona todos os elementos com a classe "card"

function getRandomImage() {
    const min = 1; // Número mínimo da imagem
    const max = 8; // Número máximo da imagem
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; // Gera um número aleatório entre 1 e 8
    const imageName = randomNumber + '.png'; // Monta o nome do arquivo de imagem
    return 'img/' + imageName; // Retorna o caminho completo da imagem
}

function flipCard() {
    const randomImage = getRandomImage(); // Obtém um caminho aleatório de imagem
    const cardImage = this.querySelector('img'); // Seleciona a imagem dentro do cartão atual
    cardImage.setAttribute('src', randomImage); // Define o atributo "src" da imagem para o caminho aleatório
}

cards.forEach(card => {
    card.addEventListener('click', flipCard); // Adiciona um ouvinte de eventos de clique para cada cartão
});

// Adiciona um ouvinte de evento de clique a cada carta
cards.forEach((card) => {
  card.addEventListener("click", function () {
    // Adiciona a classe "flipped" para girar a carta
    this.classList.toggle("flipped");

    // Obtém um número aleatório entre 1 e 8
    const randomNum = Math.floor(Math.random() * 8) + 1;

    // Obtém a imagem da carta
    const img = this.querySelector("img");

    // Altera o atributo "src" da imagem para a nova imagem aleatória
    img.src = `img/${randomNum}.png`;
  });
});
