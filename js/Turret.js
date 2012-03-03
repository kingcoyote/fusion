function Turret(x,y) {
  this.image = g_ResourceManager.turret;
  
  VisualGameObject.call(
    this,
    this.image,
    x,
    y,
    1
  );
  this.sprite.initFrames(7,4);
  this.sprite.setFrame(0);
  
  this.x -= this.sprite.width / 2;
  this.y -= this.sprite.height / 2;
  
  this.gun = new VisualGameObject(
    this.image,
    this.x,
    this.y,
    2
  );
  this.gun.sprite.initFrames(7,4);
  this.gun.sprite.setFrame(1,1);
  g_GameObjectManager.addGameObject(this.gun);
  
  // placeholder target to force refresh on first update
  this.target = { dead : true };
  
  this.update(0);
};

Turret.prototype = new VisualGameObject();

Turret.prototype.update = function(dt) {
  if(this.target.dead) {
    this.locateTarget();
  }
};

Turret.prototype.locateTarget = function() {
  for(var i in g_ApplicationManager.invaderController) {
    var invader = g_ApplicationManager.invaderController[i];
  }
};

Turret.prototype.setDirection = function(angle) {
  this.angle = angle;
  this.sprite.rotate(angle);
  this.gun.sprite.rotate(angle);
};

Turret.prototype.shoot = function() {
  
};