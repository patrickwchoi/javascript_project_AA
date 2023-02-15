const Pokemon = require('./pokemon');
const Utils = require('../utils');
const salamenceSprite = new Image();
salamenceSprite.src = './assets/salamence_sprites_31x28.png'
salamenceSprite.width = 31*2;
salamenceSprite.height = 28*4;

class TrainerPokemon extends Pokemon{
  constructor({pos, image, ctx, frames = {dimx:1, dimy:1, zoom:1}, pokedexpic, name}){
    super({pos, image, ctx, frames});
    this.name = name
    this.feelings = 'nervous :{'
    this.friendshiplevel = 0;
    this.friendshipmax = 2;
    //friendship variables: booleans for if tasks that increase friendship have been completed
    this.friendship = {
      'fed': false,
      'complimented': false,
    }
    //convert to function later
    let pokedexentry = document.createElement("div");
    pokedexentry.id = name+'Pokedex'; //ex. id-"bagonPokedex"
    let pokedexname = document.createTextNode(name+': ');
    let friendship = document.createElement('div')
    friendship.innerHTML = 'Friendship Level: '+this.friendshiplevel;
    friendship.id = name+'friendshiplevel' //#bagonfriendshiplevel
    pokedexentry.appendChild(pokedexname)
    pokedexentry.appendChild(friendship)
    document.querySelector('#pokedexContent').appendChild(pokedexentry);


  }
  
  incrementFriendship(){
    if (this.friendshiplevel===this.friendshipmax-1){ //return //trigger something for friendshipmaxed
      this.friendshiplevel=this.friendshipmax
      // document.querySelectorAll('#dialoguebox > *').forEach((el)=>el.classList.add('hidden'));
      // document.querySelector('#dialogueAnnouncement').classList.remove('hidden');
      // document.querySelector('#dialogueAnnouncement').innerHTML = 
      // `Bagon's friendship has been maxed! Bagon will now evolve into a Salamence! Congratulations!`
      Utils.changeDialogueText1(`Bagon's friendship has been maxed! Bagon will now evolve into a Salamence! Congratulations!`);
      Utils.changeDialogueText2(``);
      this.updateSpriteSalamence();
      this.name='Salamence'
    } else {
      this.friendshiplevel++
    }
  }
  updateSpriteSalamence(){
    this.image = salamenceSprite;
    this.zoom = .7;
    this.width = this.image.width/this.frames.dimx
    this.height = this.image.height/this.frames.dimy
      //these are dim of actual single sprite based on the png
    this.screenWidth = this.width*this.frames.zoom;
    this.screenHeight = this.height*this.frames.zoom;
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
  clickedOn(){ //what happens when we click on bagon
    console.log('bagon clickedOn method!')
    Utils.changeDialogueText1(`${this.name}: ${this.dialogue.roar}`);
    Utils.changeDialogueText2(`What would you like to do?`);
    this.defaultInteraction();
    // console.log('Friendship Level: '+this.friendshiplevel)
  }

  defaultInteraction(){
    document.querySelector('#bagon_face').classList.remove('hidden')
    Utils.changeButton1({
      newHTML: `Give ${this.name} compliments${this.friendship.complimented ? ` again`: ``}`,
      onClick: ()=>{
        Utils.hideElements('.dialogueButtonOption')
        Utils.changeDialogueText1(`${this.name}: ${this.dialogue.happy}`);
        Utils.changeDialogueText2(`*Giving ${this.name} compliments*`);
        this.friendship.complimented = true;
        this.incrementFriendship();
      }, 
      bold: !this.friendship.complimented //if they didnt compliment yet, make it bold
    });

    Utils.changeButton2({
      newHTML: `Give ${this.name} treats`,
      onClick: ()=>{
        Utils.hideElements('.dialogueButtonOption')
        Utils.changeDialogueText1(`${this.name}: ${this.dialogue.eating}`);
        Utils.changeDialogueText2(`*Giving ${this.name} treats*`);
        this.friendship.fed = true;
        this.incrementFriendship();
      },
      bold: !this.friendship.fed
    });
  }
}

module.exports = TrainerPokemon;