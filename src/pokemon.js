const Sprite = require("./sprite.js");

class Pokemon extends Sprite{

  constructor({pos, image, ctx, frames = {dimx:1, dimy:1, zoom:1}}){
    super({pos, image, ctx, frames});
    this.feelings = 'nervous :{'
    this.friendshiplevel = 0;
  }
  setTrainer (player){
    this.player = player
  }
  draw(){//draw image of sprite
    this.ctx.drawImage(this.image, 
      this.frames.xval*this.width, 
      this.frames.yval*this.height,
      this.width, 
      this.height, //first 4 args are cropping sprite, if needed
      this.pos[0],
      this.pos[1], //where on canvas we place james, from the top left corner
      this.screenWidth,
      this.screenHeight); //how big img is onscreen

      // if (!this.moving) { //removing this code will always make bagon animate walking
      //   this.frames.xval=0;
      //   return;}
      this.frames.elapsed++
      if (this.frames.elapsed%15===0){
        if (this.frames.xval < this.frames.dimx-1) this.frames.xval++
        else this.frames.xval=0;
      }

  }
  fillDialogue(){
    return {
      empty: '...', 
      roar: 'Rawr!! >:O',
      eating: 'nomnomnom ^~^',
      happy: 'Rawr!! :}'
  }
  }
  followPlayer(player){
    // let playerPrevPos = player.pos
    this.pos = player.posForPokemon
    this.draw();
  }

  changePokemonDirection(keys, player){
    if (keys.w.pressed && player.moving) {
      // player.moving = true;
      this.frames.yval = 3;
    }
    else if (keys.s.pressed  && player.moving) {
      // player.moving = true;
      this.frames.yval = 0;
    }
    else if (keys.a.pressed  && player.moving) {
      // player.moving = true;
      this.frames.yval = 1;
      }
    else if (keys.d.pressed  && player.moving) {
      // player.moving = true;
      this.frames.yval = 2;
      }
  }
  clickedOn(htmlElems){ //what happens when we click on bagon
    console.log('bagon clickedOn method!')
    htmlElems.dialogueText.innerHTML = 'Bagon: '+ this.dialogue.roar;
    htmlElems.dialogueText2.innerHTML = 'What would you like to do?'
    this.defaultInteraction(htmlElems);
    console.log('Friendship Level: '+this.friendshiplevel)
  }
  defaultInteraction(htmlElems){
    htmlElems.option1.innerHTML = 'Give Bagon compliments';
    htmlElems.option1.onclick = ()=>{
      htmlElems.dialogueText.innerHTML = 'Bagon: '+ this.dialogue.happy;
      htmlElems.dialogueText2.innerHTML = '*Giving Bagon pets*'
      this.friendshiplevel+=1;
    }
    htmlElems.option2.innerHTML = 'Give Bagon treats';
    htmlElems.option2.onclick = ()=>{
      htmlElems.dialogueText.innerHTML = 'Bagon: '+ this.dialogue.eating;
      htmlElems.dialogueText2.innerHTML = '*Giving Bagon treats*'
      this.friendshiplevel+=1;
    }
  }
}

module.exports = Pokemon;