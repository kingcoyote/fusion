function Player() {
  this.speed        = 75; // base speed. between 50 and 500 is reasonable. 275 is default
  this.cooldown     = 0;
  this.firespeed    = 0.5; // weapon cooldown in seconds. 0.5 is default
  this.angle        = 0;
  this.turn_speed   = 1;
  this.gun          = { x : 50, y : 15 };
  
  this.left  = false;
  this.right = false;
  this.fire  = false;
  
  var image = g_ResourceManager.ship;
  
  VisualGameObject.call(
      this,
      image, 
      g_GameObjectManager.canvas.width / 2 - image.width / 2, 
      g_GameObjectManager.canvas.height / 2 - image.height / 2, 
      5
  );
  
  return this;
};

Player.prototype = new VisualGameObject;
  
Player.prototype.keyDown = function(event) {
  this.left  = event.keyCode == 37 ? true : this.left;
  this.right = event.keyCode == 39 ? true : this.right;
  this.up    = event.keyCode == 38 ? true : this.up;
  this.fire  = event.keyCode == 32 ? true : this.fire;
};

Player.prototype.keyUp = function(event) {
  this.left  = event.keyCode == 37 ? false : this.left;
  this.right = event.keyCode == 39 ? false : this.right;
  this.up    = event.keyCode == 38 ? false : this.up;
  this.fire  = event.keyCode == 32 ? false : this.fire;
};

Player.prototype.update = function (dt) {
  if(this.left) {
    this.angle -= dt * this.turn_speed;
  }
  
  if(this.right) {
    this.angle += dt * this.turn_speed;
  }
  
  if(this.up) {
    this.x += Math.sin(this.angle) * this.speed * dt;
    this.y += Math.cos(this.angle) * this.speed * dt;
  }
  
  this.sprite.rotate(this.angle);
};
  
Player.prototype.shoot = function() {
  
};
