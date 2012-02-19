function SpriteGameObject() {
  this.currentFrame = 0;
  this.currentRow = 0;
  this.frameWidth = 0;
  this.frameHeight = 0;
  this.image = null;
  this.mirrored = false;
  
  this.startupSpriteGameObject = function(image, x, y, z, frameCount, rowCount) {
    this.image = image;
    this.startupVisualGameObject(image, x, y, z);
    this.currentFrame = 0;
    this.currentRow = 0;
    this.frameWidth = this.image.width / frameCount;
    this.frameHeight = this.image.height / rowCount;
    return this;
  };

  this.shutdownSpriteGameObject = function(){
    this.shutdownVisualGameObject();       
  };

  this.setFrame = function(i, r) {
    this.currentFrame = i;
  };
  
  this.setRow = function(r) {
    this.currentRow = r;
  }

  this.draw = function(dt, context, xScroll, yScroll) {
    if(this.mirrored) {
      context.translate(context.width,0);
      context.scale(-1,1);
      context.drawImage(
        this.image, 
        this.currentFrame * this.frameWidth, //sx
        this.currentRow * this.frameHeight, //sy
        this.frameWidth, //sw 
        this.frameHeight, //sh
        0 - this.x, //dx
        this.y, //dy
        this.frameWidth, //dw 
        this.image.height //dh
      );
      context.scale(-1,1);
    } else {
      context.drawImage(
        this.image, 
        this.currentFrame * this.frameWidth, //sx
        this.currentRow * this.frameHeight, //sy
        this.frameWidth, //sw 
        this.frameHeight, //sh
        this.x, //dx
        this.y, //dy
        this.frameWidth, //dw 
        this.image.height //dh
      );
    }
  };

  this.collisionArea = function() {
    return new Rectangle().startupRectangle(this.x, this.y, this.frameWidth, this.frameHeight);
  };
}

SpriteGameObject.prototype = new VisualGameObject;