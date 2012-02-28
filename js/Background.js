function Background(image, width, height, speed_x, speed_y, start_x, start_y, repeat, z) {
  this.start_x = start_x;
  this.start_y = start_y;
  this.z = z;
  VisualGameObject.call(this, image, start_x, start_y, z);
  
  this.width = width;
  this.height = height;
  this.speed_x = speed_x;
  this.speed_y = speed_y;
  this.repeat = repeat;
  this.spawn_repeat = false;
};

Background.prototype = VisualGameObject;

Background.prototype.draw = function(context) {
  context.drawImage(this.sprite.source, this.x, this.y);
  
  // if the y value is above 0, we need to duplicate the image on top
  if(this.y >= 0) {
    context.drawImage(this.sprite.source, this.x, this.y - this.height);
  }
  
  // if the y value is above canvas height, we need to reset the image
  if(this.y >= g_GameObjectManager.canvas.height) {
    this.y = g_GameObjectManager.canvas.height - this.height;
  }
};

Background.prototype.update = function(dt) {
  this.y += dt * this.speed_y;
  this.x += dt * this.speed_x;
};
