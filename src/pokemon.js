const Sprite = require("./sprite.js");

class Pokemon extends Sprite{

  followPlayer(player){
    this.pos = [player.pos[0]+20, player.pos[1]]
    // this.draw();
  }
}

module.exports = Pokemon;