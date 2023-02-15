const Sprite = require("../sprite.js");
const Utils = require("../../utils.js");

class Item extends Sprite{
    constructor({pos, image, ctx, frames = {dimx:1, dimy:1, zoom:1}, player, name}){
      super({pos, image, ctx, frames})
      this.name = name
      this.player = player;
    }

    pickupItem(){ //not sure if i need this
      this.player.pickupItem(this)
      this.player.removeItem(this)
    }
}
module.exports = Item;