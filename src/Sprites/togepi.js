const Pokemon = require('./pokemon');
const Utils = require('../utils');

const togepiSprite = new Image();
togepiSprite.src = './assets/togepi_sprites_18x21.png'
togepiSprite.width = 18*2;
togepiSprite.height = 21*2;

const togepi_crying = new Image();
togepi_crying.src = './assets/togepi_crying.jpg'


class Togepi extends Pokemon{
  constructor({pos, image, ctx, frames = {dimx:2, dimy:2, zoom:2}, name, player, game}){
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
    if (this.player.metTogepiMom===false){
      Utils.changeDialogueText1('Togepi: Togepi? ;{')
      Utils.changeDialogueText2('You met Togepi! Togepi is crying... Where could its mom be?')
    } else {
      Utils.changeDialogueText1('Togepi: Togepi? ;{')
      Utils.changeDialogueText2('Togepi is still crying... We should tell its mom!')
    }
  }
}

module.exports = Togepi;