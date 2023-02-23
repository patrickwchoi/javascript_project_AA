const Pokemon = require('./pokemon');
const Utils = require('../utils');

const togepiSprite = new Image();
togepiSprite.src = './assets/togepi_sprites_18x21.png'
togepiSprite.width = 18*2;
togepiSprite.height = 21*2;

const togepi_crying = new Image();
togepi_crying.src = './assets/togepi_crying.jpg'


class Togepi extends Pokemon{
  constructor({pos, image, ctx, frames = {dimx:2, dimy:2, zoom:1.7}, name, player, game}){
    image = togepiSprite;
    frames = frames;
    super({pos, ctx, image, frames, game});
    this.name = 'togepi';
    this.feelings = 'sad :{'
    this.friendshiplevel = 0;
    this.friendshipmax = 1;
    this.encountered = false;
    this.pokedexpic = togepi_crying;
    this.moving=false;
    this.player=player;
  }
  clickedOn(){
    Utils.showPokedexPicInBottom(this.pokedexpic.src)
    Utils.goToPokedexScreen();
    switch(this.friendshiplevel) {
      case 0:
        this.interactBeforeFriendshipMax();
        break;
      case 1:
        this.interactAfterFriendshipMax();
        break;
    }
  }
  interactBeforeFriendshipMax(){
    if (this.encountered===false){
      this.encountered = true;
      Utils.changeDialogueText1('Togepi: Togepi? ;{')
      Utils.changeDialogueText2('You met Togepi! Togepi is crying... Where could its mom be?')
    } else {
      Utils.changeDialogueText1('Togepi: Togepi? ;{')
      Utils.changeDialogueText2('Togepi is still crying... We should find its mom!')
    }
  }
  interactAfterFriendshipMax(){
    Utils.changeDialogueText1('Togepi: zzzz... z_z')
    Utils.changeDialogueText2('Togepi is sleeping peacefully... It looks so cute!')
  }
  foundTogekiss(){
    this.friendshiplevel = 1;
    this.frames.yval=1;
    this.moving=true;
    // this.interactAfterFriendshipMax();
  }
  draw(){//all I am changing for togepu is how long it rotates frames
    this.ctx.drawImage(this.image, 
    this.frames.xval*this.width, 
    this.frames.yval*this.height,
    this.width, 
    this.height, //first 4 args are cropping sprite, if needed
    this.pos[0],
    this.pos[1], //where on canvas we place james, from the top left corner
    this.screenWidth,
    this.screenHeight); //how big img is onscreen

    if (!this.moving) { //removing this code will always make bagon animate walking
      this.frames.xval=0;
      return;}
    this.frames.elapsed++
    if (this.frames.elapsed%70===0){
      if (this.frames.xval < this.frames.dimx-1) this.frames.xval++
      else this.frames.xval=0;
    }
  }
}


module.exports = Togepi;