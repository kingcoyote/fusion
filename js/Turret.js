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
  
  this.gun = new VisualGameObject(
      this.image,
      x,
      y,
      2
  );
  
  this.gun.sprite.initFrames(7,4);
  this.gun.sprite.setFrame(0,1);
  
  g_GameObjectManager.addGameObject(this.gun);
};

Turret.prototype = new VisualGameObject();

Turret.prototype.update = function(dt) {
  var y = this.y - g_player.y,
      x = this.x - g_player.x;
  
  // calculate angle to the player
  this.angle = Math.atan2(y, x) - Math.PI/2;
  
  // rotate at that angle
  this.sprite.rotate(this.angle);
  
  this.gun.sprite.rotate(this.angle);
  
  if(this.fire && this.cooldown <= 0) {
    g_GameObjectManager.addGameObject(new Bullet(
        this.x + this.sprite.width / 2,
        this.y + this.sprite.width / 2,
        this.angle
    ));
    
    this.gun.sprite = AnimatedSprite(this.gun.sprite, [2,3,4,5], 0.5, false);
    
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