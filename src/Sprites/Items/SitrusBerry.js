const Item = require("./item.js");
const Utils = require("../../utils.js");

const sitrusberry_pokedexpic = new Image();
sitrusberry_pokedexpic.src = "../../assets/sitrus_berry.png";
// sitrusberry_pokedexpic.width = 20;
// sitrusberry_pokedexpic.height = 20;




class SitrusBerry extends Item{
    constructor({pos, ctx, frames = {dimx:1, dimy:1, zoom:1}, player, name, game}){
      let image = sitrusberry_pokedexpic;
      // image.width=20;
      // image.height=20;
      image.style.width = '20px'; // set the width to 20 pixels
      image.style.height = 'auto';
      super({pos, image, ctx, frames, player, name, game});
      this.name='Sitrus Berry'
      this.image = sitrusberry_pokedexpic;
      // this.image.width=20;
      // this.image.height=20;
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