"use strict";

console.log('Hola');
var lista = [1, 2, 3, 4, 5];
lista.map(function (x) {
  return Math.pow(x, 2);
}).forEach(function (x) {
  return console.log(x);
});