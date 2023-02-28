const collisions = require("./Map/collisions.js");
const Sprite = require("./Sprites/sprite.js");
const Player = require("./Sprites/player.js");
const Boundary = require("./Map/boundary.js");
// import Boundary from './Map/boundary.js';
const Utils = require("./utils.js");
const TrainerPokemon = require("./Sprites/trainerpokemon.js");
const Snorlax = require("./Sprites/snorlax.js");
const SitrusBerry = require("./Sprites/Items/SitrusBerry.js");
const Togepi = require("./Sprites/togepi.js");
const Togekiss = require("./Sprites/togekiss.js");


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
    // console.log([canvas.width / 2 +50, canvas.height / 2 +50])
    this.snorlax = new Snorlax({
      // pos: [canvas.width / 2 +50, canvas.height / 2 +50], 
      pos: [345,150],
      ctx: this.ctx,
      player: this.player, game:this
    });
    this.sitrusberry = new SitrusBerry({
      pos: [500 , 400],
      ctx: this.ctx,
      player: this.player, game:this
    });
    this.togepi = new Togepi({
      pos: [-300 , -230],
      ctx: this.ctx,
      player: this.player, game:this
    });
    this.togekiss = new Togekiss({
      pos: [500 , -440],
      ctx: this.ctx,
      player: this.player, game:this
    });

    this.pokemonArr = [this.snorlax, this.togepi, this.togekiss]; //arr for pokemon with boundaries
    this.itemsArr = [this.sitrusberry]; //arr for items with boundaries. Split to two arrs so we can remove only items from map
    this.remakeBoundaries();
  }

  
  play() {
    this.animate();
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
    if (this.togekiss.movingToTogepi){
      this.togekiss.moveToTogepi();
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
  // let mouseY = e.clientY - 26; //36 is font size of header1
  // let mouseX = e.clientX -20;
  let mouseY = e.offsetY -12;
  let mouseX = e.offsetX -21;

  const canvasPosition = this.canvas.getBoundingClientRect();
  let offsetX = canvasPosition.left;
  let offsetY = canvasPosition.top;

  // console.log(offsetX, offsetY)
  // mouseX= e.x - offsetX 
  // mouseY= e.y - offsetY

  // console.log(e)
  // console.log(`mousex, mousey: ${[mouseX, mouseY]}`)
  // console.log(this.snorlax.pos)
  this.resetDialogue();
  if (Utils.isMouseOnRect([mouseX, mouseY], this.bagon)){
    // console.log(`bagon pos: ${this.bagon.pos}`)
    // console.log(`bagon screenwidth/height: ${[this.bagon.screenWidth, this.bagon.screenHeight]}`)
      this.bagon.clickedOn();
  } else if (Utils.isMouseOnRect([mouseX, mouseY], this.player)){
    this.player.clickedOn();
  } else if (Utils.isMouseOnRect([mouseX, mouseY], this.snorlax)){
    // console.log(`snorlax pos: ${this.snorlax.pos}`)
    this.snorlax.clickedOn();
  } else if (Utils.isMouseOnRect([mouseX, mouseY], this.sitrusberry)){
    this.sitrusberry.clickedOn();
  } else if (Utils.isMouseOnRect([mouseX, mouseY], this.togepi)){
    this.togepi.clickedOn();
  } else if (Utils.isMouseOnRect([mouseX, mouseY], this.togekiss)){
    this.togekiss.clickedOn();
  }
    else{
    this.resetDialogue();
    }
  }
  resetDialogue(){
      Utils.hideElements('#dialoguebox *')
  }

  jessieButton(){
    this.player.changeToJessie();
  }
  jamesButton(){
    this.player.changeToJames();
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
      Utils.goToInventoryScreen();
    });

    const pokedexButton = document.getElementById('pokedexButton');
    pokedexButton.addEventListener('click', function() {
      Utils.goToPokedexScreen();
    });
    const instructionsButton = document.getElementById('instructionsButton');
    instructionsButton.addEventListener('click', function() {
      Utils.clearRightContent();
      Utils.showElements('#instructions-container');
      Utils.showElements('#instructions-container > *');
    });

    const mapButton = document.getElementById('mapButton');
    mapButton.addEventListener('click', function() {
      Utils.clearRightContent();
      Utils.showElements('#map-container');
      Utils.showElements('#map-container > *');
    });

    const jessieButton = document.getElementById('jessie-button');
    jessieButton.addEventListener("click", () => this.jessieButton());
    const jamesButton = document.getElementById('james-button');
    jamesButton.addEventListener("click", () => this.jamesButton());

    //end of refactored functions

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