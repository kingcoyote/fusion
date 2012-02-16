function SpriteGameObject() {
  this.currentFrame = 0;
  this.frameWidth = 0;
  this.image = null;
  this.mirrored = false;
  
  this.startupSpriteGameObject = function(image, x, y, z, frameCount){
    this.image = image;
    this.startupVisualGameObject(image, x, y, z);
    this.currentFrame = 0;
    this.frameCount = frameCount;
    this.frameWidth = this.image.width / this.frameCount;
    return this;
  };

  this.shutdownSpriteGameObject = function(){
    this.shutdownVisualGameObject();       
  };

  this.setFrame = function(i) {
    this.currentFrame = i;
  };

  this.draw = function(dt, context, xScroll, yScroll) {
    if(this.mirrored) {
      context.translate(context.width,0);
      context.scale(-1,1);
      context.drawImage(
        this.image, 
        this.currentFrame * this.frameWidth, //sx
        0, //sy
        this.frameWidth, //sw 
        this.image.height, //sh
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
        0, //sy
        this.frameWidth, //sw 
        this.image.height, //sh
        this.x, //dx
        this.y, //dy
        this.frameWidth, //dw 
        this.image.height //dh
      );
    }
  };

  this.collisionArea = function() {
    return new Rectangle().startupRectangle(this.x, this.y, this.frameWidth, this.image.height);
  };
}

SpriteGameObject.prototype = new VisualGameObject;