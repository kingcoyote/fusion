function Sprite(source) {
  if(typeof source == 'undefined') return;
  this.source = source;
  
  this.frame_x   = 0;
  this.frame_y   = 0;
  this.scale_x   = 1;
  this.scale_y   = 1;
  this.angle     = 0;
  this.reflect_x = 1;
  this.reflect_y = 1;
  this.tile_x    = 1;
  this.tile_y    = 1;
  
  this.canvas        = document.createElement('canvas');
  this.canvas.width  = source.width;
  this.canvas.height = source.height;
  
  this.width  = this.canvas.width;
  this.height = this.canvas.height;
  
  this.initFrames(1, 1);
  this.scale(1, 1);
  this.drawSprite();
}

Sprite.prototype.draw = function(context, x, y) {
  context.drawImage(this.canvas, x - (this.canvas.width - this.width) / 2, y - (this.canvas.height - this.height) / 2);
};

Sprite.prototype.drawSprite = function() {
  var context = this.canvas.getContext('2d');
  
  // clear the canvas
  var square = Math.sqrt(this.width * this.width + this.height * this.height);
  this.canvas.width  = square * this.tile_x;
  this.canvas.height = square * this.tile_y; 
  context.clearRect(0,0,this.canvas.width, this.canvas.height);
  context.translate(
    (this.canvas.width - this.width) / 2,
    (this.canvas.height - this.height) / 2
  );
  
  // mirror
  context.translate(
    this.reflect_x == 1 ? 0 : this.width,
    this.reflect_y == 1 ? 0 : this.height
  );
  context.scale(this.reflect_x, this.reflect_y);
  
  // tile
  for(var i = 1; i <= this.tile_x; i++) {
    for(var j = 1; j <= this.tile_y; j++) {
      // rotate
      context.translate(
        this.width / 2, this.height / 2
      );
      context.rotate(this.angle);
      context.translate(
        0 - this.width / 2, 0 - this.height / 2
      );
      
      // draw and scale
      context.drawImage(
        this.source,
        this.width  * this.frame_x,
        this.height * this.frame_y,
        this.width,
        this.height,
        0,
        0,
        this.width * this.scale_x,
        this.height * this.scale_y
      );
    }
  }
};

Sprite.prototype.initFrames = function(cols, rows) {
  cols = typeof cols == 'undefined' ? 1 : cols;
  rows = typeof rows == 'undefined' ? 1 : rows;
  
  this.width  = this.source.width / cols;
  this.height = this.source.height / rows;
  
  this.drawSprite();
};

Sprite.prototype.setFrame = function(x, y) {
  x = (typeof x) === 'undefined' ? this.frame_x : x;
  y = (typeof y) === 'undefined' ? this.frame_y : y;
  
  if(this.frame_x == x && this.frame_y == y) {
    return false;
  }
  
  this.frame_x = x;
  this.frame_y = y;
  
  this.drawSprite();
  
  return this;
};

Sprite.prototype.rotate = function(rad) {
  this.angle = rad;
  this.drawSprite();
};

Sprite.prototype.scale = function(sx, sy) {
  sx = typeof sx == undefined ? 0 : sx;
  sy = typeof sy == undefined ? 0 : sy;
  
  if(this.scale_x == sx && this.scale_y == sy) {
    return false;
  }
  
  this.scale_x = sx;
  this.scale_y = sy;
  
  this.drawSprite();
  
  return this;
};

Sprite.prototype.reflect = function(y, x) {
  x = (x === true ? 1 : -1);
  y = (y === true ? 1 : -1);
  
  if(x == this.reflect_x && y == this.reflect_y) {
    return false;
  }
  
  this.reflect_x = x;
  this.reflect_y = y;
  
  this.drawSprite();
};

Sprite.prototype.setTiling = function(x, y) {
  this.tile.x = x;
  this.tile.y = y;
}

Sprite.prototype.update = function(dt) {
  
};