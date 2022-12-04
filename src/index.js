// JS Entry File
console.log('Hello');
const Sprite = require("./sprite.js");

//Create Canvas
const canvas = document.getElementById('canvas'); 
const ctx = canvas.getContext("2d");
ctx.fillRect(0,0,canvas.width, canvas.height);

//Create Variables
const map = new Image();
map.src = '../img/tilemap2_rough.png';
const james = new Image();
james.src = '../img/james_sprites.png';
let james_width = james.width*2
let james_height = james.height*2


//map.onload or window.onload? Use window.onload if u want to load with window, vs when map loads
// window.onload = function() { //map png in window on canvas when map loads
//   // ctx.drawImage(map, -1000, -700);
//   ctx.drawImage(map,0 ,0);
//   ctx.drawImage(james, 
//     0,0,
//     16,32, //first 4 args are cropping sprite
//     canvas.width/2-james_width/2,
//     canvas.height/2-james_height/2, //where on canvas we place james, from the top left corner
//     32,
//     64); //how big james is
// }


const background = new Sprite([0,0], map);

const keys = {
  w:{ pressed: false},
  a:{ pressed: false},
  s:{ pressed: false},
  d:{ pressed: false},
}

function animate() { //animates screen. will run infinietly and 'refresh' screen
  window.requestAnimationFrame(animate);
  ctx.drawImage(map, background.pos[0] ,background.pos[1]);
  ctx.drawImage(james, 
    0,0,
    16,32, //first 4 args are cropping sprite
    canvas.width/2-james_width/2,
    canvas.height/2-james_height/2, //where on canvas we place james, from the top left corner
    32,
    64); //how big james is
    console.log(keys) 
    //moving background with WASD
    if (keys.w.pressed && lastkey==='w') background.pos[1]+=8
    else if(keys.s.pressed && lastkey==='s')background.pos[1]-=8
    else if(keys.a.pressed && lastkey==='a')background.pos[0]+=8
    else if(keys.d.pressed && lastkey==='d')background.pos[0]-=8
    }
animate();


let lastkey = ''; //this is a bit redundant, but it helps tidy up wasd in case multiple keys are pressed down at once
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
  }
})
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
  }
})