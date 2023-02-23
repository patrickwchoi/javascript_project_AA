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
    this.player=player;
    
    this.moving=true;
    this.movingToTogepi = false; //set to false when production ready
    this.distmovedX = 0; //we'll edit these so he moves X pixels left and Y pixels up
    this.distmovedY = 0;
    this.inNewPos = false;
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
    this.player.metMom();
    if (this.encountered===false){
      this.encountered = true;
      this.addEntryToPokedex();
       Utils.changeDialogueText1('Togekiss: Togekiss? ;{')
       Utils.changeDialogueText2('You met Togekiss! Togekiss looks distraught... Is she looking for someone?')
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
    if (this.distmovedY ===190 ){ 
      if (this.distmovedX === 770){///set up where you want snorlax to stop moving
        this.frames.yval = 0; //facing forward
        this.inNewPos=true;
        this.friendshiplevel += 1;
        this.game.togepi.foundTogekiss();
        this.game.remakeBoundaries();
        this.moving=false;
      } else{
        this.frames.yval = 1;
        this.pos[0] -= 1;
        this.distmovedX += 1;
      }
    } else{
      this.pos[1] += 1;
      this.distmovedY += 1;
    }
  }
  interactAfterFriendshipMax(){
    Utils.changeDialogueText1('Togekiss: Togekiss!! :)')
    Utils.changeDialogueText2('Togekiss looks so relieved! She thanks you and Bagon for your help!')
    this.player.pokemon.incrementFriendship()
    Utils.changeButton1({
      newHTML: 'Level up Bagon', 
      onClick: ()=>{
        //not sure if I should handle levelup dialogue in here or in trainerpokemon incrementFriendship()
        if (this.player.pokemon.friendshiplevel === this.player.pokemon.friendshipmax){ 
          //if bagon evolved, go to bagons evolve dialogue. add condition for shelgon here when I add shelgon
          this.player.pokemon.clickedOn();
        } else{
          this.player.pokemon.clickedOn();
          Utils.changeDialogueText1('Bagon: Rawrr!!! ^u^')
          Utils.changeDialogueText2(`Bagon leveled up after helping Togekiss! He's feeling happy`)
        }
      }, 
      bold:true})
  }
}

module.exports = Togekiss;