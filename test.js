// const arr = [1, 2, 3, 4, 5];

// arr.forEach(function(elemento, indice, array) {
//   console.log("Elemento: " + elemento + ", Índice: " + indice + ", Array: " + array);
// });

// const str = "Olá, mundo!";

// for (const letra of str) {
//   console.log(letra);
// }

let listaNumeros = [3, 7, 5, 1, 4];
console.log("Lista original: " + listaNumeros);

listaNumeros.splice(2, 2);
console.log("Lista após a remoção: " + listaNumeros);