const Pokemon = require('./pokemon');
const Utils = require('../utils');

const snorlaxSprite = new Image();
snorlaxSprite.src = './assets/snorlax_spritesheet_29x29.png'
snorlaxSprite.width = 29*2;
snorlaxSprite.height = 29*4;

const snorlax_pokedexpic = new Image();
snorlax_pokedexpic.src = './assets/snorlax_pokedex.png'
// snorlax_pokedexpic.width = 20;
// snorlax_pokedexpic.height = 20;

class Snorlax extends Pokemon{
  constructor({pos, image, ctx, frames = {dimx:2, dimy:4, zoom:2}, name, player, game}){
    image = snorlaxSprite;
    frames = frames;
    super({pos, ctx, image, frames, game});
    this.name = name;
    this.feelings = 'nervous :{'
    this.friendshiplevel = 0;
    this.friendshipmax = 1;
    this.encountered = false;
    this.friendship = {
      'woke up': false,
      'fed': false,
    }
    this.pokedexpic = snorlax_pokedexpic;
    this.moving=false;
    this.player=player;
    this.inNewPos = false;
    this.distmovedX = 0; //we'll edit these so he moves X pixels left and Y pixels up
    this.distmovedY = 0;
  }
  clickedOn(){
    // Utils.hideElements
    Utils.showPokedexPicInBottom(this.pokedexpic.src)
    switch(this.friendshiplevel) {
      case 0:
        this.interactBeforeFriendship();
        break;
      case 1:
        // code block
        this.interactAfterFriendshipMax();
        break;
    }
  }
  interactAfterFriendshipMax(){
    Utils.changeDialogueText1('Snorlax: Zzz... -_-')
    Utils.changeDialogueText2(`Snorlax is now your friend! But he's sleeping again...`)
    
  }
  interactBeforeFriendship(){
    // hideElements, showElements, changeInnerHTML, changeDialogueText1, changeDialogueText2, changeButton1, changeButton2
    if (this.encountered===false){
      this.encountered = true;
      Utils.changeDialogueText1('Snorlax: Zzz... -_-')
      Utils.changeDialogueText2('You encountered a Snorlax! Snorlax is sleeping...')
      Utils.changeButton1({
        newHTML: 'Wake up Snorlax', 
        onClick: ()=>{
          console.log('clicked on option 1');
          Utils.changeDialogueText1('Snorlax: Zzz Zzz... -_-')
          Utils.changeDialogueText2(`Snorlax isn't waking up. Is there anything around us that could help?`)
          Utils.hideElements(['#option1'])
        }, 
        bold:false})
    } else {
      Utils.changeDialogueText1('Snorlax: Zzz... -_-')
      Utils.changeDialogueText2('Snorlax is still sleeping... Is there anything around us that could help?')
      if (this.player.inventory['Sitrus Berry'] > 0){
        Utils.changeButton1({
          newHTML: 'Pull out the Sitrus Berry', 
          onClick: ()=>{
            Utils.changeDialogueText1('Snorlax: Zzz?? -_-')
            Utils.changeDialogueText2(`Snorlax smelled the berry and woke up!`)
            Utils.changeButton1({
              newHTML: 'Feed Snorlax the Sitrus Berry',
              onClick: ()=>{
                Utils.changeDialogueText1('Snorlax: Nomnomnomnom! ^~^')
                Utils.changeDialogueText2(`Snorlax is eating the berry!`)
                  Utils.changeButton1({
                    newHTML: 'Continue',
                    onClick: ()=>{
                      this.incrementFriendship();
                    },
                    bold:true
                  })
              },
              bold:true
            })
          }, 
          bold:true})
      }
    }
  }
  incrementFriendship(){
    if (this.friendshiplevel === this.friendshipmax-1){
      this.friendshiplevel +=1;
      Utils.changeDialogueText2(`Snorlax's friendship level is now maxed!`)
      Utils.hideElements(['#option1']);
      this.moving=true; //trigger moving animation in animation cycle
    } else {
      console.log('cannot increment friendship')
    }
  }
  moveOutOfWay(){ 
    //move snorlax position one step at a time. First in Y direction, then in X
    if (this.distmovedY ===150 ){ 
      if (this.distmovedX === 80){///set up where you want snorlax to stop moving
        this.inNewPos=true;
        this.game.remakeBoundaries();
        this.moving=false;
      } else{
        this.pos[0] += 1;
        this.distmovedX += 1;
      }
    } else{
      this.pos[1] -= 1;
      this.distmovedY += 1;
    }
  }


}
module.exports = Snorlax;