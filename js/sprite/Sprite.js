function Sprite(source) {
  this.source = source;
  
  this.frame_x   = 0;
  this.frame_y   = 0;
  this.scale_x   = 1;
  this.scale_y   = 1;
  this.angle     = 0;
  this.reflect_x = 1;
  this.reflect_y = 1;
  
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
  context.drawImage(this.canvas, x, y);
};

Sprite.prototype.drawSprite = function() {
  this.canvas.width  = this.width  * this.scale_x;
  this.canvas.height = this.height * this.scale_y;
  
  this.canvas.getContext('2d').clearRect(0,0,this.canvas.width, this.canvas.height);
  this.canvas.getContext('2d').translate(
    this.reflect_x == 1 ? 0 : this.width,
    this.reflect_y == 1 ? 0 : this.height
  );
  this.canvas.getContext('2d').scale(this.reflect_x, this.reflect_y);
  
  this.canvas.getContext('2d').drawImage(
    this.source,
    this.width  * this.frame_x,
    this.height * this.frame_y,
    this.width,
    this.height,
    0,
    0,
    this.canvas.width,
    this.canvas.height
  );
  
  this.canvas.getContext('2d').scale(this.reflect_x, this.reflect_y);
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

Sprite.prototype.rotate = function(deg) {
  this.angle = deg;
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

Sprite.prototype.update = function(dt) {
  
};