// class Sprite{
//   constructor({pos, velocity, image, ctx, frames = {width:1, height:1, zoom:1}}) {
//     this.pos = pos //[x,y]
//     this.image=image
//     this.ctx = ctx
//     this.frames = {...frames, wval:0, hval:0, elapsed:0} //this refers to how much copies are in this sprite img
//       //basically dimensions of sprite sheet
//     //he said to wrap this in image.onload, but doesnt seem necessary
//     this.width = this.image.width/this.frames.width*this.frames.zoom
//     this.height = this.image.height/this.frames.height*this.frames.zoom
    

//       //these are dim of actual object rendered on screen
//   }
//   draw(){//draw image of sprite
//     //helps keep it dry, but i might want to remove this and do it manually bc some sprites require more args
//     // this.ctx.drawImage(this.image, this.pos[0], this.pos[1])
//     this.ctx.drawImage(this.image, 
//       this.frames.wval*this.width, 
//       this.frames.hval*this.height,
//       this.width /this.frames.width/ this.frames.zoom, 
//       this.height/this.frames.zoom, //first 4 args are cropping sprite, if needed
//       this.pos[0],
//       this.pos[1],
//       // canvas.width/2-this.image.width/this.frames.width /2,
//       // canvas.height/2-this.image.width/this.frames.height /2, //where on canvas we place james, from the top left corner
//       this.width,
//       this.height); //how big img is onscreen

//       if (this.frames.width>1){ //means we have a spritesheet, not map
//         this.frames.elapsed++
//       }
//       if (this.frames.elapsed%10===0){
//         console.log(this)
//         if (this.frames.wval < this.frames.width) this.frames.wval++
//         else this.frames.wval=0;
//         // if (this.frames.hval < this.frames.height) this.frames.hval++
//         // else this.frames.hval=0;
//       }

//   }
// }

// module.exports = Sprite;

class Sprite{
  constructor({pos, velocity, image, ctx, frames = {dimx:1, dimy:1, zoom:1}}) {
    this.pos = pos //[x,y]
    this.image=image
    this.ctx = ctx
    this.frames = {...frames, xval:0, yval:0, elapsed:0} //this refers to how much copies are in this sprite img
      //basically dimensions of sprite sheet
    //he said to wrap this in image.onload, but doesnt seem necessary
    this.width = this.image.width/this.frames.dimx
    this.height = this.image.height/this.frames.dimy
      //these are dim of actual single sprite based on the png
  }
  draw(){//draw image of sprite
    this.ctx.drawImage(this.image, 
      this.frames.xval*this.width, 
      this.frames.yval*this.height,
      this.width, 
      this.height, //first 4 args are cropping sprite, if needed
      this.pos[0],
      this.pos[1], //where on canvas we place james, from the top left corner
      this.width*this.frames.zoom,
      this.height*this.frames.zoom); //how big img is onscreen

      if (this.frames.dimx>1){ //means we have a spritesheet, not map
        this.frames.elapsed++
      }
      if (this.frames.elapsed%20===0){
        if (this.frames.xval < this.frames.dimx-1) this.frames.xval++
        else this.frames.xval=0;
        // if (this.frames.yval < this.frames.height) this.frames.yval++
        // else this.frames.yval=0;
      }

  }
}

module.exports = Sprite;