const Pokemon = require('./pokemon');
const Utils = require('../utils');
const salamenceSprite = new Image();
salamenceSprite.src = './assets/salamence_sprites_31x28.png'
salamenceSprite.width = 31*2;
salamenceSprite.height = 28*4;

const bagon_pokedexpic = new Image();
bagon_pokedexpic.src = './assets/bagon_face.png';
const salamence_pokedexpic = new Image();
salamence_pokedexpic.src = './assets/salamence_pokedexpic.png';

class TrainerPokemon extends Pokemon{
  constructor({pos, image, ctx, frames = {dimx:1, dimy:1, zoom:1}}, game){
    super({pos, image, ctx, frames, game});
    this.pokedexpic = bagon_pokedexpic;
    this.name = 'bagon'
    this.feelings = 'nervous :{'
    this.friendshiplevel = 0;
    this.friendshipmax = 4;
    //friendship variables: booleans for if tasks that increase friendship have been completed
    this.friendship = {
      'fed': false,
      'complimented': false,
      'snorlax' : false,
      'togepi' : false,
    }
    this.pokedexpic=bagon_pokedexpic;
    this.addEntryToPokedex();
    this.addProgressDiv();
  }

  incrementFriendship(){ //this doesnt trigger dialogue by itself
    this.updateProgressDiv(); //before calling incrementFrienship() anywhere, must update the friendship object for this to update
    if (this.friendshiplevel<this.friendshipmax){
      this.friendshiplevel++
      this.updatePokedexFriendship();
    } else{
      console.log('friendship maxed out')
    }
  }

  evolveToSalamence(){
    this.updateSpriteSalamence();
    this.name='salamence'
    Utils.changeDialogueText1(`Bagon's friendship has been maxed! Bagon will now evolve into a Salamence! Congratulations!`);
    Utils.changeDialogueText2(``);
    this.updatePokedexFriendship();
    // this.pokedexpic = salamence_pokedexpic;
    Utils.showPokedexPicInBottom(this.pokedexpic.src);
  }
  updateSpriteSalamence(){
    this.image = salamenceSprite;
    this.pokedexpic = salamence_pokedexpic;
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
    Utils.goToPokedexScreen();
    Utils.showPokedexPicInBottom(this.pokedexpic.src);
    switch (true){
      case this.friendshiplevel < this.friendshipmax:
        this.defaultInteraction();
        break;
      case this.friendshiplevel === this.friendshipmax:
        if (this.name!='salamence'){
          this.evolveToSalamence();
        } else{
          this.SalamenceInteraction();
        }
        break;
    }
  }

  defaultInteraction(){
    Utils.changeDialogueText1(`${this.name}: ${this.dialogue.roar}`);
    Utils.changeDialogueText2(`What would you like to do?`);
    Utils.changeButton1({
      newHTML: `Give ${this.name} compliments${this.friendship.complimented ? ` again`: ``}`,
      onClick: ()=>{
        Utils.hideElements('.dialogueButtonOption')
        Utils.changeDialogueText1(`${this.name}: ${this.dialogue.happy}`);
        Utils.changeDialogueText2(`*Giving ${this.name} compliments*`);
        if (this.friendship.complimented===false){
          this.friendship.complimented = true;
          this.incrementFriendship();
        }
      }, 
      bold: !this.friendship.complimented //if they didnt compliment yet, make it bold
    });
    Utils.changeButton2({
      newHTML: `Give ${this.name} treats${this.friendship.fed ? ` again`: ``}`,
      onClick: ()=>{
        Utils.hideElements('.dialogueButtonOption')
        Utils.changeDialogueText1(`${this.name}: ${this.dialogue.eating}`);
        Utils.changeDialogueText2(`*Giving ${this.name} treats*`);
        if (this.friendship.fed===false){
          this.friendship.fed = true;
          this.incrementFriendship();
        }
      },
      bold: !this.friendship.fed
    });
  }

  updatePokedexFriendship(){
    //for bagon, some changes must be made to function to account for evolution
    let pokedexFriendship = document.querySelector(`#bagon-pokedex-item .pokedex-friendshiplevel`);
    pokedexFriendship.innerHTML = `Friendship level: ${this.friendshiplevel}/${this.friendshipmax}`
    const pokemonImage = document.querySelector('.pokedex-img-right');
    pokemonImage.src = this.pokedexpic.src;
    Utils.goToPokedexScreen();
  }
  addProgressDiv(){
    //add the progress div
    let bagonProgressDiv =  document.createElement(`div`);
    bagonProgressDiv.id = `bagon-progressdiv`;

    let progressHeader = document.createElement(`h2`)
    progressHeader.innerHTML = `Friendship Progress`;
    bagonProgressDiv.appendChild(progressHeader);

    for (let task in this.friendship) {
      let taskItem = document.createElement(`div`);
      taskItem.classList.add(`progress-item`);
      taskItem.id = `progress-item-${task}`;
      taskItem.innerHTML = `???: Incomplete`;
      bagonProgressDiv.appendChild(taskItem);
    }
    let bagonPokedexItem  = document.querySelector(`#bagon-pokedex-item`);
    bagonPokedexItem.appendChild(bagonProgressDiv)
  }
  updateProgressDiv(){
    for (let task in this.friendship) {
      let taskItem = document.querySelector(`#progress-item-${task}`);
      if (this.friendship[task]){
        taskItem.innerHTML = `${task}: Comeplete!`;
      }
    }
  }

  SalamenceInteraction(){
    Utils.changeDialogueText1(`${this.name}: ${this.dialogue.roar}`);
    Utils.changeDialogueText2(`Congrats on evolving Bagon to a Salamence! Refresh to restart`);
    Utils.hideElements('#option1')
  }
  
}

module.exports = TrainerPokemon;