
class Boundary {
  static width = 16;
  static height = 16;
  constructor({pos, ctx}){
    this.pos = pos
    this.ctx = ctx
    this.width = 16
    this.height = 16  //dimensions of tiles after adjusting for zoom
  }
  draw() {
    this.ctx.fillStyle = 'rgba(255,0,0,0.3)';
    this.ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
  }
}

module.exports = Boundary;