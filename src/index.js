// JS Entry File
const Game = require("./game.js");

//Create Canvas
const canvas = document.getElementById('canvas'); 

let g = new Game(canvas);
g.play();

// //Create Variables
// const map = new Image();
// map.src = '../img/tilemap4.png';
// const james = new Image();
// james.src = '../img/james_sprites.png';

// //iterate through collisions arr incrementing by width. Creates 2d arr of collisions
// let mapWidthTiles = map.width/16;
// const collisionsMap = [];
// for (let i=0; i<collisions.length; i+=mapWidthTiles){ //do i do .length-1?
//   collisionsMap.push(collisions.slice(i, i+mapWidthTiles))
// }

// const boundaries = [];
// const offset = [0,-80] //default location of map at start
// //add to map class as instance variables

// collisionsMap.forEach((row, i) => {
//   row.forEach((symbol, j)=>{
//     if (symbol === 17281){ //if pos on our collisions grid has collision, add boundaruy
//       boundaries.push(new Boundary({
//       ctx:ctx,
//       pos: [j*Boundary.width + offset[0],i*Boundary.height+ offset[1]] 
//     }))}
//     //pushing boundary object where i is row, j is coln in our collisions arr
//   })
// })

// const background = new Sprite({pos: offset, image: map, ctx:ctx});
// const player = new Player({
//   pos: [canvas.width/2 - 48/3, canvas.height/2 - 80/4] , //manually fixed pos based on james.png dim
//   image: james, ctx:ctx,
//   frames:{dimx:3, dimy:4, zoom:1.75}});
// console.log(background)
// console.log(player)
// const keys = {
//   w:{ pressed: false},
//   a:{ pressed: false},
//   s:{ pressed: false},
//   d:{ pressed: false},
// }
// let lastkey = 'something'; //this is a bit redundant, but it helps tidy up wasd in case multiple keys are pressed down at once
// window.addEventListener("keydown", (e)=>{ //whenever a key is pressed, will update keys hash
//   switch(e.key){
//     case 'w': 
//       keys.w.pressed = true
//       lastkey = 'w'
//       break;
//     case 'a': 
//       keys.a.pressed = true
//       lastkey = 'a'
//       break;
//     case 's': 
//       keys.s.pressed = true
//       lastkey = 's'
//       break;
//     case 'd': 
//       keys.d.pressed = true
//       lastkey = 'd'
//       break;
//   }})
// window.addEventListener("keyup", (e)=>{ //whenever a key is not pressed, will update keys hash
//   switch(e.key){
//     case 'w': 
//       keys.w.pressed = false
//       break;
//     case 'a': 
//       keys.a.pressed = false
//       break;
//     case 's': 
//       keys.s.pressed = false
//       break;
//     case 'd': 
//       keys.d.pressed = false
//       break;
// }})

// const moveables = [background, ...boundaries];


// function animate() { //animates screen. will run infinietly and 'refresh' screen
//   window.requestAnimationFrame(animate);
//   background.draw();
//   boundaries.forEach(boundary => { 
//     boundary.draw(); //animate our collisions
//   })
//   player.draw();

//   let moving = true;
//   player.moving = false;
//   //moving background with WASD
//   Utils.movePlayer(player, keys, boundaries, moveables, lastkey, moving);

//   }
// animate();

