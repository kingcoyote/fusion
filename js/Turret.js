function Turret(x,y) {
  this.fire      = false;
  this.cooldown  = 0;
  this.firespeed = 1;
  this.angle     = 0;
  this.image     = g_ResourceManager.turret;
  
  VisualGameObject.call(
      this,
      this.image,
      x,
      y,
      1
  );
  
  this.sprite.initFrames(7,4);
  this.sprite.setFrame(1);
};

Turret.prototype = new VisualGameObject();

Turret.prototype.update = function(dt) {
  var y = this.y - g_player.y,
      x = this.x - g_player.x;
  
  // calculate angle to the player
  this.angle = Math.atan2(y, x) - Math.PI/2;
  
  // rotate at that angle
  this.sprite.rotate(this.angle);
  
  if(this.fire && this.cooldown <= 0) {
    g_GameObjectManager.addGameObject(new Bullet(
        this.x + this.sprite.width / 2,
        this.y + this.sprite.width / 2,
        this.angle
    ));
    
    this.cooldown = this.firespeed;
  } else if (this.cooldown > 0) {
    this.cooldown -= dt;
  }
};

Turret.prototype.keyDown = function(event) {
  this.fire = event.keyCode == 66 ? true  : this.fire;
};

Turret.prototype.keyUp = function(event) {
  this.fire = event.keyCode == 66 ? false : this.fire; 
};