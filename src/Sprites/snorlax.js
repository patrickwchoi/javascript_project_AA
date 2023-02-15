const Pokemon = require('./pokemon');
const Utils = require('../utils');

const snorlaxSprite = new Image();
snorlaxSprite.src = './assets/snorlax_spritesheet_29x29.png'
snorlaxSprite.width = 29*2;
snorlaxSprite.height = 29*4;

class Snorlax extends Pokemon{
  constructor({pos, image, ctx, frames = {dimx:2, dimy:4, zoom:2}, pokedexpic, name}){
    image = snorlaxSprite;
    frames = frames;
    super({pos, ctx, image, frames});
    // this.pos = pos;
    // this.ctx = ctx;
    this.name = name;
    this.feelings = 'nervous :{'
    this.friendshiplevel = 0;
    this.friendshipmax = 2;
    this.encountered = false;
    this.friendship = {
      'woke up': false,
      'fed': false,
    }
  }
  clickedOn(){
    console.log('clicked on snorlax')
    switch(this.friendshiplevel) {
      case 0:
        this.interactBeforeFriendship();
        break;
      case 1:
        // code block
        break;
      case 2:
        // code block
    }
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
        }, 
        bold:false})
    } else {
      this.encountered = true;
      Utils.changeDialogueText1('Snorlax: Zzz... -_-')
      Utils.changeDialogueText2('Snorlax is still sleeping...')
      // if (player has the berry){
      //   Utils.changeButton1({
      //     newHTML: 'Feed Snorlax the Oran Berry', 
      //     onClick: ()=>{
      //       Utils.changeDialogueText1('Snorlax: Zzz?? Nomnomnom...')
      //       Utils.changeDialogueText2(`Snorlax smelled the berry and woke up!`)
      //     }, 
      //     bold:true})
      // }
    }
  }

}
module.exports = Snorlax;