// JS Entry File
const Game = require("./game.js");

//Create Canvas
const canvas = document.getElementById('canvas'); 
console.log('index')
let g = new Game(canvas);
g.play();

