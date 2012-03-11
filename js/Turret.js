function Turret(x,y) {
  this.firespeed = 0.75;
  this.cooldown  = 0;
  this.angle = 0;
  this.range = 400;
  
  this.image = g_ResourceManager.turret;
  
  VisualGameObject.call(
    this,
    this.image,
    x,
    y,
    1
  );
  this.sprite.initFrames(7,5);
  this.sprite.setFrame(0,0);
  
  this.x -= this.sprite.width / 2;
  this.y -= this.sprite.height / 2;
  
  this.gun = new VisualGameObject(
    this.image,
    this.x,
    this.y,
    2
  );
  this.gun.sprite.initFrames(7,5);
  this.gun.sprite.setFrame(0,1);
  g_GameObjectManager.addGameObject(this.gun);
  
  // placeholder target to force refresh on first update
  this.target = { dead : true };
  
  this.update(0);
};

Turret.prototype = new VisualGameObject();

Turret.prototype.update = function(dt) {
  this.locateTarget();
  if(this.target.x && this.target.y) {
    this.setDirection(Math.atan2(this.y - this.target.y, this.x - this.target.x) - Math.PI / 2);
  } else {
    this.setDirection(0);
  }
  
  this.cooldown -= dt;
  
  if(this.cooldown <= 0 && ! this.target.dead) {
    this.shoot();
    this.cooldown = this.firespeed;
  }
};

Turret.prototype.locateTarget = function() {
  var distance = Infinity,
    target = { dead : true };
  for(var i in g_ApplicationManager.invaderController.invaders) {
    var invader = g_ApplicationManager.invaderController.invaders[i],
      x = invader.x,
      y = invader.y,
      d = Math.sqrt((this.x - x) * (this.x - x) + (this.y - y) * (this.y - y));
    
    if(invader.dead) continue;
    
    if(d < distance && d < this.range) {
      target = invader;
      distance = d;
    }
  }
  
  this.target = target;
};

Turret.prototype.shoot = function() {
  var bullet = new Bullet(
    this.x + this.sprite.width / 2,
    this.y + this.sprite.height / 2,
    this.angle,
    -1
  );
  
  g_GameObjectManager.addGameObject(bullet);
}

Turret.prototype.setDirection = function(angle) {
  this.angle = angle;
  this.sprite.rotate(angle);
  this.gun.sprite.rotate(angle);
};