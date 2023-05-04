//eslint-disable-next-line
class Shape {
    constructor(shape, o) {
      this.shape = shape;
      this.pos = this.reset();
      this.ordinal = o;
    }
  
    reset() {
      this.pos = new Array(4);
      for (var i = 0; i < this.pos.length; i++) {
        this.pos[i] = this.shape[i].slice();
      }
      return this.pos;
    }
  }
  