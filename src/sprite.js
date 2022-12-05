class Sprite{
  constructor({pos, velocity, image, ctx, frames = {width:1, height:1, zoom:1}}) {
    this.pos = pos //[x,y]
    this.image=image
    this.ctx = ctx
    this.frames = frames //this refers to how much copies are in this sprite img
      //basically dimensions of sprite sheet
    //he said to wrap this in image.onload, but doesnt seem necessary
    this.width = this.image.width/this.frames.width*this.frames.zoom
    this.height = this.image.height/this.frames.height*this.frames.zoom
      //these are dim of actual object rendered on screen
  }
  draw(){//draw image of sprite
    //helps keep it dry, but i might want to remove this and do it manually bc some sprites require more args
    // this.ctx.drawImage(this.image, this.pos[0], this.pos[1])

    this.ctx.drawImage(this.image, 
      0,0,
      this.width/this.frames.zoom, 
      this.height/this.frames.zoom, //first 4 args are cropping sprite, if needed
      this.pos[0],
      this.pos[1],
      // canvas.width/2-this.image.width/this.frames.width /2,
      // canvas.height/2-this.image.width/this.frames.height /2, //where on canvas we place james, from the top left corner
      this.width,
      this.height); //how big img is onscreen
  }
}

module.exports = Sprite;