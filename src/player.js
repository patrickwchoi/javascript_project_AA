const Sprite = require("./sprite.js");

class Player extends Sprite{
  // draw(){
  //   this.ctx.drawImage(this.image, 
  //     0,0,
  //     this.image.width/3 ,this.image.height/4, //first 4 args are cropping sprite
  //     canvas.width/2-this.image.width/3 /2,
  //     canvas.height/2-this.image.width/4 /2, //where on canvas we place james, from the top left corner
  //     32,
  //     40); //how big james is
  // }
}
module.exports = Player;