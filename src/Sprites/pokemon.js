const Sprite = require("./sprite.js");

const salamenceSprite = new Image();
salamenceSprite.src = './assets/salamence_sprites_31x28.png'
salamenceSprite.width = 31*2;
salamenceSprite.height = 28*4;

class Pokemon extends Sprite{

  constructor({pos, image, ctx, frames = {dimx:1, dimy:1, zoom:1}, pokedexpic, name, game}){
    super({pos, image, ctx, frames, game});
    this.name = name
    this.feelings = 'nervous :{'
    this.friendshiplevel = 0;
    this.friendshipmax = 2;
  }
  addToPokedex(){
    let pokedexentry = document.createElement("div");
    pokedexentry.id = name+'Pokedex'; //ex. id-"bagonPokedex"
    let pokedexname = document.createTextNode(name+': ');
    let friendship = document.createElement('div')
    friendship.innerHTML = 'Friendship Level: '+this.friendshiplevel;
    friendship.id = name+'friendshiplevel' //#bagonfriendshiplevel
    pokedexentry.appendChild(pokedexname)
    pokedexentry.appendChild(friendship)
    document.querySelector('#pokedex-container').appendChild(pokedexentry);
  }
  
  incrementFriendship(){
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

    if (!this.moving) { //removing this code will always make bagon animate walking
      this.frames.xval=0;
      return;}
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

  clickedOn(){ 
    console.log(`${this.name} clickedOn method!`)
  }
  defaultInteraction(){
  }

}

module.exports = Pokemon;