const Item = require("./item.js");
const Utils = require("../../utils.js");



class SitrusBerry extends Item{
    constructor(...args){
      super(...args);
      this.name='Sitrus Berry'
    }

    clickedOn(){
      Utils.changeDialogueText2(`It's a Sitrus Berry`);
      Utils.changeButton1({
        newHTML: 'Pick up',
        onClick: ()=>{
          this.player.pickupItem(this);
          Utils.changeDialogueText2(`Picked up a Sitrus Berry!`);
          this.removeItemFromMap();
          Utils.hideElements(['#option1'])
        },
        bold: false
      })
    }
  

}
module.exports = SitrusBerry;