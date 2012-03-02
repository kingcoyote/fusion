function Player() {
  this.speed        = 225; // base speed. between 50 and 500 is reasonable. 275 is default
  this.cooldown     = 0;
  this.firespeed    = 0.5; // weapon cooldown in seconds. 0.5 is default
  this.angle        = 0;
  this.turn_speed   = 2;
  this.gun          = { x : 0, y : -30 };
  
  this.gun.angle    = Math.PI / 2 - Math.atan2(this.gun.y, this.gun.x);
  this.gun.distance = Math.sqrt(this.gun.x * this.gun.x + this.gun.y * this.gun.y);
  
  console.log(this.gun);
  
  this.left  = false;
  this.right = false;
  this.up    = false;
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
    this.y -= Math.cos(this.angle) * this.speed * dt;
  }
  
  if(this.fire && this.cooldown <= 0) {
    var bullet = new Bullet(
      (this.x + this.sprite.width / 2 ) + ((Math.sin(this.angle - this.gun.angle)) * this.gun.distance * -1), 
      (this.y + this.sprite.height / 2) + ((Math.cos(this.angle - this.gun.angle)) * this.gun.distance), 
      this.angle
    );
    g_GameObjectManager.addGameObject(bullet);
    
    this.cooldown = this.firespeed;
  } else if (this.cooldown > 0) {
    this.cooldown -= dt;
  }
  
  this.sprite.rotate(this.angle);
};
  
Player.prototype.shoot = function() {
  
};
