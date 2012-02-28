function VisualGameObject(image, x, y, z) {
  GameObject.call(this, x, y, z);
  this.sprite = new Sprite(image);
  return this;
}

VisualGameObject.prototype = GameObject;

VisualGameObject.prototype.draw = function(context) {
  this.sprite.draw(context, Math.ceil(this.x), Math.ceil(this.y));
};

VisualGameObject.prototype.update = function(dt) {
  if(this.sprite.update) {
    this.sprite.update(dt);
  }
};

VisualGameObject.prototype.shutdown = function() {
  this.sprite = null;
  GameObect.prototype.shutdown.call(this);
};

VisualGameObject.prototype.collisionArea = function() {
  return new Rectangle().startupRectangle(this.x, this.y, this.sprite.width, this.sprite.height);
};
