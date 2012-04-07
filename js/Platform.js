function Platform() {
  this.speed = 15;
  
  this.extension_image = new Sprite(g_ResourceManager.platformex2);
  
  VisualGameObject.call(
    this,
    g_ResourceManager.platformex, 
    35, 
    598, 
    -2
  );
  
  return this;
};

Platform.prototype = new VisualGameObject;

Platform.prototype.draw = function(context) {
  this.sprite.draw(context, Math.ceil(this.x), Math.ceil(this.y));
  if(this.y + this.sprite.height < g_GameObjectManager.canvas.height) {
    var extra_pieces = ((g_GameObjectManager.canvas.height - this.y + this.sprite.height) % this.extension_image.height) + 1;
    for(var i = 0; i <= extra_pieces; i++) {
      this.extension_image.draw(context, Math.ceil(this.x), Math.ceil(this.y + this.sprite.height + this.extension_image.height * i));
    }
  }
};

Platform.prototype.extend = function(length) {
  this.extension = length;
};

Platform.prototype.update = function(dt) {
  if(this.extension >= 0) {
    this.y         -= this.speed * dt;
    this.extension -= this.speed * dt;
    for(var i in g_ApplicationManager.turrets) {
      g_ApplicationManager.turrets[i].y -= this.speed * dt;
    }
  }
}
