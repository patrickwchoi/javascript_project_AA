
class Boundary {
  // static width = 16;
  // static height = 16;
  constructor({pos, ctx, width=16, height=16}){
    this.pos = pos
    this.ctx = ctx
    this.frames = {zoom:1}
    this.width = width
    this.height = height  //dimensions of tiles after adjusting for zoom
  }
  draw() {
    this.ctx.fillStyle = 'rgba(255,0,0,0.3)'; //last arg id opacity
    this.ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
  }
}

module.exports = Boundary;
// export default Boundary;