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
    this.friendshipmax = 1;
    this.encountered = false;
  }
  interact(){
    if (this.encountered===false){
      this.encountered = true;
      document.querySelectorAll('#dialoguebox > *').forEach((el)=>el.classList.add('hidden'));
      document.querySelector('#dialogueAnnouncement').classList.remove('hidden');
      document.querySelector('#dialogueAnnouncement').innerHTML = 
      `You encountered a Snorlax! Snorlax is sleeping...`
    } else {
      document.querySelectorAll('#dialoguebox > *').forEach((el)=>el.classList.add('hidden'));
      document.querySelector('#dialogueAnnouncement').classList.remove('hidden');
      document.querySelector('#dialogueAnnouncement').innerHTML = 
      `Snorlax is still sleeping...`
    }
  }

}
module.exports = Snorlax;