// JS Entry File
const Game = require("./game.js");
// import Game from './game.js';

//Create Canvas
const canvas = document.getElementById('canvas'); 
let g = new Game(canvas);
g.play();

