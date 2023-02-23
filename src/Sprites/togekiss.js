const Pokemon = require('./pokemon');
const Utils = require('../utils');

const togekissSprite = new Image();
togekissSprite.src = './assets/togekiss_spritesheet_34x34.png'
togekissSprite.width = 34*3;
togekissSprite.height = 34*4;

const togepi_crying = new Image();
togepi_crying.src = './assets/togepi_crying.jpg'


class Togekiss extends Pokemon{
  constructor({pos, image, ctx, frames = {dimx:3, dimy:4, zoom:1.5}, name, player, game}){
    image = togekissSprite;
    frames = frames;
    super({pos, ctx, image, frames, game});
    this.name = 'togekiss';
    this.feelings = 'sad :{'
    this.friendshiplevel = 0;
    this.friendshipmax = 1;
    this.encountered = false;
    // this.pokedexpic = togekiss_crying;
    this.moving=true;
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
    
  }
}

module.exports = Togekiss;