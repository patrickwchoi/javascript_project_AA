// JS Entry File
console.log('Hello');
const Sprite = require("./sprite.js");
const collisions = require("./collisions.js");
const Player = require("./player.js");
const Boundary = require("./boundary.js");

//Create Canvas
const canvas = document.getElementById('canvas'); 
const ctx = canvas.getContext("2d");
ctx.fillRect(0,0,canvas.width, canvas.height);

//iterate through collisions arr incrementing by width. Creates 2d arr of collisions
const collisionsMap = [];
for (let i=0; i<collisions.length; i+=125){ //do i do .length-1?
  collisionsMap.push(collisions.slice(i, i+125))
}

const boundaries = [];
const offset = [0,-80] //default location of map at start

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j)=>{
    if (symbol === 17281){ //if pos on our collisions grid has collision, add boundaruy
      boundaries.push(new Boundary({
      ctx:ctx,
      pos: [j*Boundary.width + offset[0],i*Boundary.height+ offset[1]] 
    }))}
    //pushing boundary object where i is row, j is coln in our collisions arr
  })
})

//Create Variables
const map = new Image();
map.src = '../img/tilemap3.png';
const james = new Image();
james.src = '../img/james_sprites.png';

const background = new Sprite({pos: offset, image: map, ctx:ctx});
const player = new Player({
  pos: [canvas.width/2 - 48/3, canvas.height/2 - 80/4] , //manually fixed pos based on james.png dim
  image: james, ctx:ctx,
  frames:{dimx:3, dimy:4, zoom:1.75}});
console.log(background)
console.log(player)
const keys = {
  w:{ pressed: false},
  a:{ pressed: false},
  s:{ pressed: false},
  d:{ pressed: false},
}
let lastkey = 'something'; //this is a bit redundant, but it helps tidy up wasd in case multiple keys are pressed down at once
window.addEventListener("keydown", (e)=>{ //whenever a key is pressed, will update keys hash
  switch(e.key){
    case 'w': 
      keys.w.pressed = true
      lastkey = 'w'
      break;
    case 'a': 
      keys.a.pressed = true
      lastkey = 'a'
      break;
    case 's': 
      keys.s.pressed = true
      lastkey = 's'
      break;
    case 'd': 
      keys.d.pressed = true
      lastkey = 'd'
      break;
  }})
window.addEventListener("keyup", (e)=>{ //whenever a key is not pressed, will update keys hash
  switch(e.key){
    case 'w': 
      keys.w.pressed = false
      break;
    case 'a': 
      keys.a.pressed = false
      break;
    case 's': 
      keys.s.pressed = false
      break;
    case 'd': 
      keys.d.pressed = false
      break;
}})

const moveables = [background, ...boundaries];

function rectangularCollision(rec1, rec2){
  let r1zoom = rec1.frames.zoom;
  let r2zoom = rec2.frames.zoom;
  return (
    rec1.pos[0]+rec1.width*r1zoom >= rec2.pos[0]&&
    rec1.pos[0] <= rec2.pos[0]+rec2.width*r2zoom&&
    rec1.pos[1]+rec1.height*r1zoom >= rec2.pos[1]&&
    rec1.pos[1] <= rec2.pos[1]+rec2.height*r2zoom
  )
}
function animate() { //animates screen. will run infinietly and 'refresh' screen
  window.requestAnimationFrame(animate);
  background.draw();
  boundaries.forEach(boundary => { 
    boundary.draw(); //animate our collisions
  })
  player.draw();

  let moving = true;
  player.moving = false;
  //moving background with WASD
  if (keys.w.pressed && lastkey) {
    player.moving = true;
    player.frames.yval = 3;
    for (let i=0; i<boundaries.length; i++){
      let boundary = boundaries[i]
      //creating copy of boundary rectangle one step in future
      if (rectangularCollision(player, {...boundary,
        pos: [boundary.pos[0], boundary.pos[1]+8]})){
          console.log('w')
          moving=false;
          break;
      }}
    if (moving){ //if we should be moving
      moveables.forEach((moveable) => moveable.pos[1]+=4) }
    }
      
  else if (keys.s.pressed && lastkey) {
    player.moving = true;
    player.frames.yval = 0;
    for (let i=0; i<boundaries.length; i++){
      let boundary = boundaries[i]
      if (rectangularCollision(player, {...boundary,
        pos: [boundary.pos[0], boundary.pos[1]-8]})){
          console.log('s')
          moving=false;
          break;
      }}
    if (moving){ 
      moveables.forEach((moveable) => moveable.pos[1]-=4) }
    }

  else if (keys.a.pressed && lastkey) {
    player.moving = true;
    player.frames.yval = 1;
    for (let i=0; i<boundaries.length; i++){
      let boundary = boundaries[i]
      if (rectangularCollision(player, {...boundary,
        pos: [boundary.pos[0]+8, boundary.pos[1]]})){
          moving=false;
          console.log('a')
          break;
      }}
    if (moving){ 
      moveables.forEach((moveable) => moveable.pos[0]+=4) }
    }

  else if (keys.d.pressed && lastkey) {
    player.moving = true;
    player.frames.yval = 2;
    for (let i=0; i<boundaries.length; i++){
      let boundary = boundaries[i]
      if (rectangularCollision(player, {...boundary,
        pos: [boundary.pos[0]-8, boundary.pos[1]]})){
          moving=false;
          console.log('d')
          break;
      }}
    if (moving){ 
      moveables.forEach((moveable) => moveable.pos[0]-=4) }
    }
  }
animate();

