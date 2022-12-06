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
      moveables.forEach((moveable) => moveable.pos[1]+=4) 
      // update pokemons position to follow you
      player.posForPokemon = [player.pos[0], player.pos[1]+ 35] //35 is roughly pokemons height
    }
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
      moveables.forEach((moveable) => moveable.pos[1]-=4) 
      player.posForPokemon = [player.pos[0], player.pos[1]- 35]
    }
       
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
      moveables.forEach((moveable) => moveable.pos[0]+=4) 
      player.posForPokemon = [player.pos[0]+30, player.pos[1]] 
    }
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
      moveables.forEach((moveable) => moveable.pos[0]-=4) 
      player.posForPokemon = [player.pos[0]-30, player.pos[1]] 
    }
    }
}
module.exports = {
  rectangularCollision, movePlayer
};