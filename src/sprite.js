class Sprite{
  constructor(pos, image) {
    this.pos = pos //[x,y]
    this.image=image
  }
  // draw(){//draw image of sprite
  //   //helps keep it dry, but i might want to remove this and do it manually bc some sprites require more args
  //   ctx.drawImage(this.image, this.pos[0], this.pos[1])
  // }
}

module.exports = Sprite;