const Item = require("./item.js");
const Utils = require("../../utils.js");

const sitrusberry_pokedexpic = new Image();
sitrusberry_pokedexpic.src = "../../assets/sitrus_berry.png";
// sitrusberry_pokedexpic.width = 20;
// sitrusberry_pokedexpic.height = 20;




class SitrusBerry extends Item{
    constructor(...args){
      super(...args);
      this.name='Sitrus Berry'
      this.pokedexpic = sitrusberry_pokedexpic;
    }

    clickedOn(){
      Utils.showPokedexPicInBottom(this.pokedexpic.src)
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