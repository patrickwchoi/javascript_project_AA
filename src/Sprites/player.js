const Sprite = require("./sprite.js");
const Utils = require("../utils.js");

class Player extends Sprite{

  constructor(...args){
    super(...args)
    this.prevPos = this.pos
    this.stepsMoved = 0;
    this.posForPokemon = [this.pos[0]-25, this.pos[1]] //25 is guess for pokemons width
    this.moving = false;
    this.inventory={};
    // this.pokemon = bagon
  }
  pickupItem(item){
    if (this.inventory[item.name]){
      this.inventory[item.name] += 1
    } else {
      this.inventory[item.name] = 1
    }
    item.pickedup = true;
    Utils.changeDialogueText2(`Picked up an ${item.name}`)
  }
  removeItem(item){
    if (this.inventory[item.name]){
      this.inventory[item.name] -= 1
    } else{
      Utils.changeDialogueText2(`You don't have an ${item.name}!`)
    }
  }
  
}
module.exports = Player;