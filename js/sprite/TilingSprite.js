function TilingSprite(sprite) {
  
  sprite.tile = {
    x : 1,
    y : 1
  };
  
  sprite.draw = function(context, x, y) {
    for(var i = 1; i <= this.tile.x; i++) {
      for(var j = 1; j <= this.tile.y; j++) { 
        context.drawImage(
          this.canvas, 
          x - (this.canvas.width - this.width) / 2 + ((i * Math.sin(this.angle) * this.canvas.width) + (i * this.canvas.width)), 
          y - (this.canvas.height - this.height) / 2 - ((j * Math.cos(this.angle) * this.canvas.height) + (j * this.canvas.height))
        );
      }
    }
  }; 
  
  sprite.setTiling = function(x, y) {
    this.tile.x = x;
    this.tile.y = y;
  }
  
  return sprite;
}