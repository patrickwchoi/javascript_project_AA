const Pokemon = require('./pokemon');
const Utils = require('../utils');

const togekissSprite = new Image();
togekissSprite.src = './assets/togekiss_spritesheet_34x34.png'
togekissSprite.width = 34*3;
togekissSprite.height = 34*4;

const togekiss_pokedex = new Image();
togekiss_pokedex.src = './assets/togekiss_pokedex.png'


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
    this.pokedexpic = togekiss_pokedex;
    this.moving=true;
    this.player=player;
    this.movingToTogepi = false;
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
  async interactBeforeFriendshipMax(){
    this.player.metMom();
    if (this.encountered===false){
      this.encountered = true;
      await Utils.changeDialogueText1('Togekiss: Togekiss? ;{')
      await Utils.changeDialogueText2('You met Togekiss! Togekiss looks distraught... Is she looking for someone?')
    } else {
      Utils.changeDialogueText1('Togekiss: Togekiss? ;{')
      Utils.changeDialogueText2('Togekiss still looks distraught... Is she looking for someone?')
    }
    if (this.game.togepi.encountered===true){
      Utils.changeButton1({
        newHTML: 'Tell her you found Togepi', 
        onClick: ()=>{
          Utils.changeDialogueText1('Togekiss: Togekiss??? ')
          Utils.changeDialogueText2(`Togekiss looks relieved! Tell her where Togepi is!`)
          this.handleTogepiQuestion();
        }, 
        bold:false})
    } 
  }

  handleTogepiQuestion(){
    Utils.changeButton1({
      newHTML: 'Tell her Togepi is by the waterfall',
      onClick: ()=>{
        Utils.changeDialogueText2(`That's not true! Think...`)
      }
    })
    Utils.changeButton2({
      newHTML: 'Tell her Togepi is on the island',
      onClick: ()=>{
        Utils.changeDialogueText1('')
        Utils.changeDialogueText2(`You tell her you saw Togepi on the island.`)
        this.game.togekiss.movingToTogepi = true;
      }
    })
  }
  moveToTogepi(){

  }
}

module.exports = Togekiss;