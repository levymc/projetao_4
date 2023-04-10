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

function confere(){
    let x = prompt("Deseja continuar jogando? Caso queira digite 'sim', caso contrário digite 'não'")
    if (x == 'sim'){
        reiniciarJogo();
    }else if(x == 'não'){
        
    }else{
        alert("Opção inválida");
        confere();
    }
}


function jogo(){
    let paresEncontrados = 0;
    let time = 0;
    let tempo = function(){
        time++
        console.log(time);
    }
    

    btnRestart.style.opacity = "1";
    let numCartas;
    do {
    numCartas = prompt("Com quantas cartas você quer jogar? Insira um número par entre 4 e 14:");
    } while (numCartas % 2 !== 0 || numCartas < 4 || numCartas > 14);


    const tableDiv = document.querySelector('.table');
    let contador = 1;

    for (let i = 0; i < numCartas/2; i++) {
        let a = Math.floor(Math.random() * 8) + 1;
        const newCard1 = `<div data-test="card" class="card"><img src="./img/back.png" data-test="face-down-image" data-name="${a}" data-position="${a*11}"></div>`;
        const newCard2 = `<div data-test="card" class="card"><img src="./img/back.png" data-test="face-down-image" data-name="${a}" data-position="${a*6}"></div>`;
        tableDiv.insertAdjacentHTML('beforeend', newCard1);
        tableDiv.insertAdjacentHTML('beforeend', newCard2);
        contador ++;
    }

    const cards = document.querySelectorAll('.card');
    let cartasViradas = [];
    let firstCard = null;
    let secondCard = null;
    let numJogadas = 0;
    let listaNumeros = [];
    while (listaNumeros.length < numCartas) {
        let numeroAleatorio = Math.floor(Math.random() * 8) + 1;
        if (listaNumeros.indexOf(numeroAleatorio) === -1) {
          listaNumeros.push(numeroAleatorio);
          listaNumeros.push(numeroAleatorio);
        }
      }
    listaNumeros = listaNumeros.sort(funcaoAleatoria)
    let contPares = 0;
    function funcaoAleatoria() {
        return Math.random() - 0.5;
      }
      

    cards.forEach(card => { // card é cada card dentro de cards
        card.addEventListener('click', () => { // espera clicar em algum card
            const img = card.querySelector("img");
            numJogadas++;
                
            if (cartasViradas.length < 2 && !card.classList.contains("flipped")) {
                if (!firstCard) { // se ainda nao existir primeira card
                    firstCard = card;
                    card.classList.add("flipped");
                    if (!card.dataset.img) { // confere se a card ja foi virada
                        console.log(listaNumeros)
                        console.log("Jogadas", numJogadas);
                        let num = listaNumeros[0];
                        console.log(num);
                        card.dataset.img = `img/${num}.gif`; // Lógica errada... ele deve buscar umaimg entre 1-8.gif e salvar a escolhida em uma lista com chave e valor, salvando a  frequencia que ela foi alocada
                        listaNumeros.shift();
                        contPares++
                        if (contPares == 1){
                            contPares = 0;
                        }
                    }
                    img.src = card.dataset.img;
                    img.setAttribute('data-test', 'face-up-image');
                    cartasViradas.push(card);
                }
                else if (!secondCard) {
                    secondCard = card;
                    card.classList.add("flipped");
                    if (!card.dataset.img) { // confere se a card ja foi virada
                        console.log("Jogadas", numJogadas);
                        let num = listaNumeros[0]
                        card.dataset.img = `img/${num}.gif`; // Lógica errada... ele deve buscar umaimg entre 1-8.gif e salvar a escolhida em uma lista com chave e valor, salvando a  frequencia que ela foi alocada
                        console.log(num);
                        contPares++
                        listaNumeros.shift();
                        console.log(listaNumeros)
                        if (contPares == 1){
                            
                            contPares = 0;
                        }
                    }
                    img.src = card.dataset.img;
                    img.setAttribute('data-test', 'face-up-image');
                    cartasViradas.push(card);
                }
                
                if (cartasViradas.length === 2) {
                    const firstCardImg = cartasViradas[0].querySelector("img").src;
                    const secondCardImg = cartasViradas[1].querySelector("img").src;
                            
                    if (firstCardImg == secondCardImg) { // ganhou
                        // clearInterval(intervalId);
                        paresEncontrados++;
                        if (paresEncontrados === numCartas/2) {
                            alert(`Você ganhou em ${numJogadas/2} jogadas!`);
                            setTimeout(() => {
                                confere();
                            }, 1000); // espera 1sg
                            cartasViradas.forEach(card => {
                                card.removeEventListener("click");
                            });
                            firstCard = null;
                            secondCard = null;
                            cartasViradas = [];
                          }
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
