const Sprite = require("../sprite.js");
const Utils = require("../../utils.js");

const pokeballImg = new Image();
pokeballImg.src = "../../../assets/pokeball3.png"
pokeballImg.width = 23;
pokeballImg.height = 23;

class Item extends Sprite{
    constructor({pos, image=pokeballImg, ctx, frames = {dimx:1, dimy:1, zoom:1}, player, name, game}){
      super({pos, image, ctx, frames, game})
      this.name = name
      this.player = player;
      this.pickedup=false
    }
    removeItemFromMap(){
      this.game.removeItemFromMap(this)
    }
}
module.exports = Item;