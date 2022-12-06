const collisions = require("./collisions.js");
const Sprite = require("./sprite.js");
const Player = require("./player.js");
const Boundary = require("./boundary.js");
const Utils = require("./utils.js");
const Pokemon = require("./pokemon.js");

//Create Variables
const map = new Image();
map.src = "./assets/tilemap5.png";
map.width = 2000; //MUST CHANGE MANUALLY WHEN CHANGING MAP DIMENSIONS
map.height = 1400;

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
    console.log(map)
    this.ctx.drawImage(map,0,0)
    this.offset = [0, -80]; //default location of map at start

    this.collisionsMap = this.make2dArrCollisions();
    this.boundaries = this.addBoundaries(this.collisionsMap);

    this.framesPressed = 0; //will let us know how long a key is held down
    this.registerEventListeners();

    this.background = new Sprite({
      pos: this.offset,
      image: map,
      ctx: this.ctx,
    });
    this.player = new Player({
      pos: [canvas.width / 2 - james.width/3, canvas.height/2 - james.height/4], //manually fixed pos based on james.png dim
      image: james,
      ctx: this.ctx,
      frames: { dimx: 3, dimy: 4, zoom: 1.75 },
    });

    this.bagon = new Pokemon({
      pos: [canvas.width / 2 , canvas.height / 2 ], //very rough pos, will fix later
      image: bagonImg,
      ctx: this.ctx,
      frames: { dimx: 2, dimy: 4, zoom: 1.75 }});
    console.log(this.bagon)

    this.moveables = [this.background, ...this.boundaries];
    
    // this.play();
  }
  play() {this.animate();}

  animate() {
    //animates screen. will run infinietly and 'refresh' screen
    this.background.draw();
    this.drawBoundaries(); //disable when finished with game
    this.bagon.movePokemonFollow(this.keys, true) //true means nothing rn
    this.bagon.followPlayer(this.player);
    
    this.player.draw();
    let moving = true;
    //player.moving signals player should be moving bc wasd is pressed
    //moving signals if the conditions (rectangular collision) to move are true or false
    this.player.moving = false;
    //moving background with WASD
    Utils.movePlayer(this.player, this.keys, this.boundaries, this.moveables, this.lastkey, moving);
    console.log(this.keys)
    window.requestAnimationFrame(this.animate.bind(this));
  }

  drawBoundaries(){
    this.boundaries.forEach((boundary) => {
      boundary.draw(); //animate our collisions
    });
  }

  registerEventListeners() {
    this.keys = {
      w:{ pressed: false, timePressed :0},
      a:{ pressed: false, timePressed :0},
      s:{ pressed: false, timePressed :0},
      d:{ pressed: false, timePressed :0},
    }
    this.lastkey = 'something';
    
    window.addEventListener("keydown", (e) => {
      //whenever a key is pressed, will update keys hash
      switch (e.key) {
        case "w":
          this.keys.w.pressed = true;
          this.keys.w.timePressed+=1
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
          break;
        case "a":
          this.keys.a.pressed = false;
          break;
        case "s":
          this.keys.s.pressed = false;
          break;
        case "d":
          this.keys.d.pressed = false;
          break;
      }
    });
  }

  addBoundaries(collisionsMap) {
    let boundaries = [];
    console.log('line 98 before iterating through collisions')
    collisionsMap.forEach((row, i) => {
      row.forEach((symbol, j) => {
        console.log('addingboundary')
        if (symbol === 17281) {
          //if pos on our collisions grid has collision, add boundaruy
          boundaries.push(
            new Boundary({
              ctx: this.ctx,
              pos: [
                j * Boundary.width + this.offset[0],
                i * Boundary.height + this.offset[1],
              ],
            })
          );
        }
        //pushing boundary object where i is row, j is coln in our collisions arr
      });
    });
    return boundaries;
  }
  
  make2dArrCollisions() {
    let mapWidthTiles = 125 //map.width / 16;
    const collisionsMap = [];
    console.log('mapWidthTiles:'+ mapWidthTiles) //check if mapwodthtiles is 0 and infinte loop
    for (let i = 0; i < collisions.length; i += mapWidthTiles) {
      //do i do .length-1?
      collisionsMap.push(collisions.slice(i, i + mapWidthTiles));
    }
    return collisionsMap;
  }
}
module.exports = Game;
