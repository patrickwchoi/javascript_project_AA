const Boundary = require("./Map/boundary.js");

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
      player.posForPokemon = [player.pos[0], player.pos[1]+ 35] //35 is roughly pokemons height
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
      player.posForPokemon = [player.pos[0], player.pos[1]- 35]
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
      player.posForPokemon = [player.pos[0]+30, player.pos[1]] 
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
      player.posForPokemon = [player.pos[0]-30, player.pos[1]] 
    }
    } else player.moving = false;

}

function isMouseOnRect(mousePos, rec1){
  return (
  (mousePos[0]>rec1.pos[0] && mousePos[0]<(rec1.pos[0]+rec1.screenWidth)) &&
  (mousePos[1]>rec1.pos[1] && mousePos[1]<(rec1.pos[1]+rec1.screenHeight))
  )
}

function addBoundaries({collisionsMap, offset}) {
  let boundaries = [];
  collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 17281 || symbol === 2684371841 || symbol ===1610630017 || symbol === 3221242753) {
        //if pos on our collisions grid has collision, add boundaruy
        boundaries.push(
          new Boundary({
            ctx: this.ctx,
            pos: [
              j * Boundary.width + offset[0],
              i * Boundary.height + offset[1],
            ],
          })
        );
      }
      //pushing boundary object where i is row, j is coln in our collisions arr
    });
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
function changeDialogueText(newHTML){ //Bottom dialogue box
  const dialogue = document.getElementById("dialoguetext");
  dialogue.innerHTML = newHTML;
}
function changeDialogueText2(newHTML){ //Bottom dialogue box
  const dialogue = document.getElementById("dialoguetext2");
  dialogue.innerHTML = newHTML;
}

module.exports = {
  rectangularCollision, movePlayer, isMouseOnRect, addBoundaries, 
  hideElements, showElements, changeInnerHTML, changeDialogueText, changeDialogueText2
};