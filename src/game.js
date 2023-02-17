const collisions = require("./Map/collisions.js");
const Sprite = require("./Sprites/sprite.js");
const Player = require("./Sprites/player.js");
const Boundary = require("./Map/boundary.js");
// import Boundary from './Map/boundary.js';
const Utils = require("./utils.js");
const Pokemon = require("./Sprites/pokemon.js");
const TrainerPokemon = require("./Sprites/trainerpokemon.js");
const Item = require("./Sprites/Items/item.js");
const Snorlax = require("./Sprites/snorlax.js");
const SitrusBerry = require("./Sprites/Items/SitrusBerry.js");

//Create Variables
const dialogueBox = document.querySelector('#dialoguebox');
const dialogueText1 = document.querySelector('#dialoguetext1');
const dialogueText2 = document.querySelector('#dialoguetext2');
const option1 =  document.querySelector('#option1');
const option2 =  document.querySelector('#option2');

const menuButton = document.querySelector('#menuButton');
const menu = document.querySelector('#menu');
const defaultContentRight = document.querySelectorAll('.default-content-right');//object like array
const backToBeforeMenu = document.querySelector('#backToBeforeMenu');
const instructionsButton = document.querySelector('#instructionsButton');
const instructions = document.querySelector('#instructions');
const menuContent = document.querySelectorAll('.menuContent');
const mapButton = document.querySelector('#mapButton');
const backToMenuButton = document.querySelector('#backToMenuButton');
const pokedexButton = document.querySelector('#pokedexButton');

const map = new Image();
map.src = "./assets/tilemap8.png";
map.width = 160*16; //MUST CHANGE MANUALLY WHEN CHANGING MAP DIMENSIONS
map.height = 130*16;

const james = new Image();
james.src = "./assets/james_sprites.png";
james.width = 16*3;
james.height = 20*4;

const bagonImg = new Image();
bagonImg.src = "./assets/bagon_sprites.png"
bagonImg.width = 16*2;
bagonImg.height = 21*4;

const pokeballImg = new Image();
pokeballImg.src = "./assets/pokeball.png"
// pokeballImg.width = 920;
// pokeballImg.height = 512;
pokeballImg.width = 920/100;
pokeballImg.height = 512/100;

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.ctx.drawImage(map,0,0)
    this.offset = [-1400, -1200]; //default location of map at start

    this.collisionsMap = this.make2dArrCollisions();
 
    this.framesPressed = 0; //will let us know how long a key is held down
    this.registerEventListeners();

    this.background = new Sprite({
      pos: this.offset, image: map, ctx: this.ctx, });
    this.bagon = new TrainerPokemon({
      pos: [canvas.width / 2 , canvas.height / 2 ], //very rough pos, will fix later
      image: bagonImg,
      ctx: this.ctx,
      frames: { dimx: 2, dimy: 4, zoom: 1.8 }
      });
    this.player = new Player({
      pos: [canvas.width / 2 - james.width/3, canvas.height/2 - james.height/4], //manually fixed pos based on james.png dim
      image: james,
      ctx: this.ctx,
      frames: { dimx: 3, dimy: 4, zoom: 1.8 },
      pokemon: this.bagon,
    });
    this.bagon.setTrainer(this.player);
    console.log([canvas.width / 2 +50, canvas.height / 2 +50])
    this.snorlax = new Snorlax({
      // pos: [canvas.width / 2 +50, canvas.height / 2 +50], 
      pos: [345,150],
      ctx: this.ctx,
      player: this.player, game:this
    });
    this.sitrusberry = new SitrusBerry({
      pos: [canvas.width / 2 -120, canvas.height / 2 +50],
      ctx: this.ctx,
      player: this.player, game:this
    });
    this.pokemonArr = [this.snorlax]; //arr for pokemon with boundaries
    this.itemsArr = [this.sitrusberry]; //arr for items with boundaries. Split to two arrs so we can remove only items from map
    this.remakeBoundaries();
  }

  
  play() {
    this.animate();
    console.log("play")
  }
  
  animate() {
    //animates screen. will run infinietly and 'refresh' screen
    this.background.draw();
    this.drawBoundaries(); //disable when finished with game
    this.bagon.changePokemonDirection(this.keys, this.player) 
    this.bagon.followPlayer(this.player);
    this.player.draw();
    if (this.snorlax.moving){
      this.snorlax.moveOutOfWay();
    } 
    this.pokemonArr.forEach((sprite) => { //draw sprite if its not picked up
      sprite.draw();
    })
    this.itemsArr.forEach((sprite) => { 
      sprite.draw();
    })
    let moving = true;
    //player.moving signals player should be moving bc wasd is pressed
    //moving signals if the conditions (rectangular collision) to move are true or false
    Utils.movePlayer(this.player, this.keys, this.boundaries, this.moveables, this.lastkey, moving);
    
    window.requestAnimationFrame(this.animate.bind(this));
  }
  
  removeItemFromMap(sprite){ //removes sprite from map. so just meant for items
    this.itemsArr = this.itemsArr.filter((item) => item !== sprite);
    this.remakeBoundaries();
  }
  remakeBoundaries(){ //requires this.pokemonArr and this.itemsArr to be set to correct values
    this.boundaries = Utils.addBoundaries({
      collisionsMap: this.collisionsMap, ctx: this.ctx, offset: this.offset});
    this.boundaries = Utils.addSpriteBoundaries({
      boundaries: this.boundaries, ctx: this.ctx, sprites: this.pokemonArr.concat(this.itemsArr)});

    this.moveables = [this.background, ...this.boundaries, ...this.pokemonArr.concat(this.itemsArr)];
  }

  drawBoundaries(){
    this.boundaries.forEach((boundary) => {
      boundary.draw(); //animate our collisions
    });
  }

  click(e){
    //what happens when you click on screen and not on specific html elem
  let mouseY = e.clientY - 36; //36 is font size of header1
  let mouseX = e.clientX

  this.resetDialogue();
  if (Utils.isMouseOnRect([mouseX, mouseY], this.bagon)){
      this.bagon.clickedOn();
  } else if (Utils.isMouseOnRect([mouseX, mouseY], this.player)){
    this.player.clickedOn();
  } else if (Utils.isMouseOnRect([mouseX, mouseY], this.snorlax)){
    this.snorlax.clickedOn();
  } else if (Utils.isMouseOnRect([mouseX, mouseY], this.sitrusberry)){
    this.sitrusberry.clickedOn();
  }
    else{
    this.resetDialogue();
    }
  }
  resetDialogue(){
      Utils.hideElements('#dialoguebox *')
  }

  registerEventListeners() {
    this.boundClickHandler = this.click.bind(this);
    this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);

    //start of refactored functions

    const backToDefaultButtons = document.querySelectorAll('.backToDefault');
    backToDefaultButtons.forEach(button => {
      button.addEventListener('click', function() {
        Utils.defaultScreenRight();
      });
    });

    const inventoryButton = document.getElementById('inventoryButton');
    inventoryButton.addEventListener('click', function() {
      Utils.clearRightContent();
      Utils.showElements('#inventory-container');
      Utils.showElements('#inventory-container > *');
    });
    //end of refactored functions

    //Menu Button
    menuButton.addEventListener('click', ()=>{
      defaultContentRight.forEach((button)=>button.classList.add('hidden'))
      backToBeforeMenu.classList.remove('hidden')
      menuContent.forEach((button)=>button.classList.remove('hidden'))
    })
    //Back To Before Menu Button
    backToBeforeMenu.addEventListener('click', ()=>{
      //add back before menu content
      defaultContentRight.forEach((button)=>button.classList.remove('hidden'))
      //remove menu content
      menuContent.forEach((button)=>button.classList.add('hidden'))
      //remove instructions instructions
      instructions.classList.add('hidden');
      //both instructions and menu
      backToBeforeMenu.classList.add('hidden');

    })
    //Instructions Button
    instructionsButton.addEventListener('click', ()=>{
      defaultContentRight.forEach((button)=>button.classList.add('hidden'));
      backToBeforeMenu.classList.remove('hidden');
      instructions.classList.remove('hidden');
    })

    //map button
    mapButton.addEventListener('click', ()=>{
      document.querySelectorAll('#menu *').forEach((el)=>el.classList.add('hidden'));
      document.querySelectorAll('#mapContent *').forEach((el)=>el.classList.remove('hidden'));
      document.querySelector('#mapContent').classList.remove('hidden');
      backToBeforeMenu.classList.add('hidden')
      backToMenuButton.classList.remove('hidden')
    })

    //pokedex button
    pokedexButton.addEventListener('click', ()=>{
      document.querySelector('#pokedex-container').classList.remove('hidden');
      // document.querySelectorAll('#pokedex-container *').forEach((el)=>el.classList.remove('hidden'));
      backToBeforeMenu.classList.add('hidden')
      pokedexButton.classList.add('hidden')
      document.querySelector('#mapButton').classList.add('hidden');

      backToMenuButton.classList.remove('hidden')
      // document.querySelector('#Bagonfriendshiplevel').innerHTML = 'Friendship Level: '+this.bagon.friendshiplevel + '/'+this.bagon.friendshipmax //not sure why id is capital, check why
    })

    //Back to Menu button
    backToMenuButton.addEventListener('click', ()=>{
      document.querySelectorAll('#menu > *').forEach((el)=>{
        el.classList.add('hidden')
      })
      // menuContent.forEach((button)=>button.classList.remove('hidden'))
      document.querySelectorAll('#menu > .menuContent').forEach((el)=>{
        el.classList.remove('hidden')
      })
      backToBeforeMenu.classList.remove('hidden')
    })
    this.keys = {
      w:{ pressed: false, startTime:0, timePressed :0},
      a:{ pressed: false, startTime:0, timePressed :0},
      s:{ pressed: false, startTime:0, timePressed :0},
      d:{ pressed: false, startTime:0, timePressed :0},
    }
    this.lastkey = 'something';
    window.addEventListener("keydown", (e) => {
      //whenever a key is pressed, will update keys hash
      switch (e.key) {
        case "w":
            //if we are just starting to press w, start tracking time
          if (this.keys.w.pressed===false){this.keys.w.startTime = e.timeStamp} 
          this.keys.w.pressed = true;
          this.keys.w.timePressed=e.timeStamp-this.keys.w.startTime
          this.lastkey = "w";
          break;
        case "a":
          this.keys.a.pressed = true;
          this.keys.a.timePressed+=1
          this.lastkey = "a";
          break;
        case "s":
          this.keys.s.pressed = true;
          this.keys.s.timePressed+=1
          this.lastkey = "s";
          break;
        case "d":
          this.keys.d.pressed = true;
          this.keys.d.timePressed+=1
          this.lastkey = "d";
          break;
      }
    });
    window.addEventListener("keyup", (e) => {
      //whenever a key is not pressed, will update keys hash
      switch (e.key) {
        case "w":
          this.keys.w.pressed = false;
          this.keys.w.timePressed=0
          break;
        case "a":
          this.keys.a.pressed = false;
          this.keys.a.timePressed=0
          break;
        case "s":
          this.keys.s.pressed = false;
          this.keys.s.timePressed=0
          break;
        case "d":
          this.keys.d.pressed = false;
          this.keys.d.timePressed=0
          break;
      }
    });
  }
  
  make2dArrCollisions() {
    let mapWidthTiles = map.width / 16;
    const collisionsMap = [];
    // console.log('mapWidthTiles:'+ mapWidthTiles) //check if mapwodthtiles is 0 and infinte loop
    for (let i = 0; i < collisions.length; i += mapWidthTiles) {
      //do i do .length-1?
      collisionsMap.push(collisions.slice(i, i + mapWidthTiles));
    }
    return collisionsMap;
  }

}

module.exports = Game;
