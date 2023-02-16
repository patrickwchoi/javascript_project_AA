const Item = require("./item.js");
const Utils = require("../../utils.js");



class SitrusBerry extends Item{
    constructor(...args){
      super(...args);
      this.name='Sitrus Berry'
    }

    clickedOn(){
      console.log('sitrusberry clicked on')
      this.player.pickupItem(this);
      Utils.changeDialogueText2(`Picked up a Sitrus Berry`);
      this.removeItemFromMap();
    }
  

}
module.exports = SitrusBerry;