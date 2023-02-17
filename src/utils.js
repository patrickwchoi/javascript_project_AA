const Boundary = require("./Map/boundary.js");
// import Boundary from './Map/boundary.js';

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

function movePlayer(player, keys, boundaries, moveables, lastkey, moving){
  keys.w.timePressed = 10;
  keys.a.timePressed = 10;
  keys.s.timePressed = 10;
  keys.d.timePressed = 10; //remove this if yu want a delay for where you are facing
  let offsetForPokemonX=0
  let offsetForPokemonY=0
  if (player.pokemon.name==="Salamence"){
    console.log('hello')
    offsetForPokemonX = -12
    offsetForPokemonY = -10
  }
  if (keys.w.pressed && lastkey) {
    player.frames.yval = 3;
    for (let i=0; i<boundaries.length; i++){
      let boundary = boundaries[i]
      //creating copy of boundary rectangle one step in future
      if (rectangularCollision(player, {...boundary,
        pos: [boundary.pos[0], boundary.pos[1]+8]})){
          moving=false;
          break;
      }}

    if (moving&& keys.w.timePressed>1){ //if we should be moving and if w is held down for more than x frames
      player.moving = true;
      moveables.forEach((moveable) => moveable.pos[1]+=4) 
      // update pokemons position to follow you
      player.posForPokemon = [player.pos[0]+offsetForPokemonX, player.pos[1]+ 35] //35 is roughly pokemons height
    }
    }
      
  else if (keys.s.pressed && lastkey) {
    player.frames.yval = 0;
    for (let i=0; i<boundaries.length; i++){
      let boundary = boundaries[i]
      if (rectangularCollision(player, {...boundary,
        pos: [boundary.pos[0], boundary.pos[1]-8]})){
          moving=false;
          break;
      }}
    if (moving&& keys.s.timePressed>1){ 
      player.moving = true;
      moveables.forEach((moveable) => moveable.pos[1]-=4) 
      player.posForPokemon = [player.pos[0]+offsetForPokemonX, player.pos[1]- player.pokemon.screenHeight]
    }
       
    }

  else if (keys.a.pressed && lastkey) {
    player.frames.yval = 1;
    for (let i=0; i<boundaries.length; i++){
      let boundary = boundaries[i]
      if (rectangularCollision(player, {...boundary,
        pos: [boundary.pos[0]+8, boundary.pos[1]]})){
          moving=false;
          break;
      }}
    if (moving&& keys.a.timePressed>1){ 
      player.moving = true;
      moveables.forEach((moveable) => moveable.pos[0]+=4) 
      player.posForPokemon = [player.pos[0]+ 30, player.pos[1] + offsetForPokemonY] 
    }
    }

  else if (keys.d.pressed && lastkey) {
    player.frames.yval = 2;
    for (let i=0; i<boundaries.length; i++){
      let boundary = boundaries[i]
      if (rectangularCollision(player, {...boundary,
        pos: [boundary.pos[0]-8, boundary.pos[1]]})){
          moving=false;
          break;
      }}
    if (moving&& keys.d.timePressed>1){ 
      player.moving = true;
      moveables.forEach((moveable) => moveable.pos[0]-=4) 
      player.posForPokemon = [player.pos[0]-player.pokemon.screenWidth, player.pos[1] + offsetForPokemonY] 
    }
    } else player.moving = false;

}

function isMouseOnRect(mousePos, rec1){
  return (
  (mousePos[0]>rec1.pos[0] && mousePos[0]<(rec1.pos[0]+rec1.screenWidth)) &&
  (mousePos[1]>rec1.pos[1] && mousePos[1]<(rec1.pos[1]+rec1.screenHeight))
  )
}

function addBoundaries({collisionsMap, ctx, offset}) {
  let boundaries = [];
  collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 17281 || symbol === 2684371841 || symbol ===1610630017 || symbol === 3221242753) {
        //if pos on our collisions grid has collision, add boundaruy
        boundaries.push(
          
          new Boundary({
            ctx: ctx,
            pos: [
              j * 16 + offset[0],
              i * 16 + offset[1]
              // We multiply by 16 bc this is for our standard boundary tile from Tiled
            ],
          })
        );
      }
      //pushing boundary object where i is row, j is coln in our collisions arr
    });
  });
  return boundaries;
}
function addSpriteBoundaries({boundaries, ctx, sprites}) { //for adding sprites in sprite array to boundaries array
  console.log(sprites)
  sprites.forEach((sprite) => {
    boundaries.push(
      new Boundary({
        ctx: ctx,
        pos: [
          sprite.pos[0] ,
          sprite.pos[1] ,
        ],
        width: sprite.screenWidth,
        height: sprite.screenHeight,
      })
    );
  });
  return boundaries;
}

function hideElements(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    element.classList.add("hidden");
  });
}
function showElements(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    element.classList.remove("hidden");
  });
}
function changeInnerHTML(selector, newHTML) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    element.innerHTML = newHTML;
  });
}
function changeDialogueText1(newHTML){ //Bottom dialogue box
  const dialogue = document.getElementById("dialoguetext1");
  showElements("#dialoguetext1");
  showElements("#dialogue-text-container");
  dialogue.innerHTML = newHTML;
}
function changeDialogueText2(newHTML){ //Bottom dialogue box
  const dialogue = document.getElementById("dialoguetext2");
  showElements("#dialoguetext2");
  showElements("#dialogue-text-container");
  dialogue.innerHTML = newHTML;
}
function changeButton1({newHTML, onClick, bold=false}){ //Bottom button box 1
  const button = document.getElementById("option1");
  showElements("#option1");
  showElements("#dialogueButtons");
  if (newHTML){
    button.innerHTML = newHTML;
  }
  if (onClick){
    button.onclick = onClick;
  }
  if (bold){
    button.style.fontWeight = 'bold';
  } else{
    button.style.fontWeight = 'normal';
  }
  console.log(bold)
}
function changeButton2({newHTML, onClick, bold=false}){ //Bottom button box 2
  const button = document.getElementById("option2");
  showElements("#option2");
  showElements("#dialogueButtons");
  if (newHTML){
    button.innerHTML = newHTML;
  }
  if (onClick){
    button.onclick = onClick;
  }
  if (bold){
    button.style.fontWeight = 'bold';
  } else{
    button.style.fontWeight = 'normal';
  }
}
function showPokedexPicInBottom(pokedexpic) {
  const pic = document.getElementById("pokedex_pic_bottom")
  pic.src = pokedexpic;
  showElements("#pokedex_pic_bottom");
}

//functions for right side (#rightside-container)
function clearRightContent(){
  hideElements("#rightside-container > *");
}
function defaultScreenRight() {
  clearRightContent();
  showElements("#rightside-container > *");
}

module.exports = {
  rectangularCollision, movePlayer, isMouseOnRect, addBoundaries, addSpriteBoundaries,
  hideElements, showElements, changeInnerHTML, changeDialogueText1, changeDialogueText2, 
  changeButton1, changeButton2, showPokedexPicInBottom
};