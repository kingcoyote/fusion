function Turret(type,x,y) {
  this.angle = 0;
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
  this.cooldown = 0;
  
  this.weapon = Turret.weapon[type];
  this.weapon.init(this);
  
  // placeholder target to force refresh on first update
  this.target = { dead : true };
  this.update(0);
};

Turret.prototype = new VisualGameObject();

Turret.gun     = 'gun';
Turret.missile = 'missile';
Turret.laser   = 'laser';
Turret.twin    = 'twin';

Turret.prototype.update = function(dt) {
  this.gun.x = this.x;
  this.gun.y = this.y;
  
  if(this.target.x && this.target.y) {
    this.setDirection(Math.atan2(this.y - this.target.y, this.x - this.target.x) - Math.PI / 2);
  } else {
    this.setDirection(0);
  }
  
  this.cooldown -= dt;
  
  if(this.cooldown <= 0 && ! this.target.dead) {
    this.shoot();
    this.cooldown = this.weapon.firespeed;
  } 
  
  if(this.cooldown <= 0 && this.target.dead) {
    this.locateTarget();
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
    
    if(d < distance && d < this.weapon.range) {
      target = invader;
      distance = d;
    }
  }
  
  this.target = target;
};

Turret.prototype.shoot = function() {
  this.weapon.shoot(this);
};

Turret.prototype.setDirection = function(angle) {
  this.angle = angle;
  this.sprite.rotate(angle);
  this.gun.sprite.rotate(angle);
};

// weapon list
Turret.weapon = {};

// gun
Turret.weapon.gun = {
  firespeed : 0.75,
  range     : 400
};
Turret.weapon.gun.init = function(turret) {
  turret.gun = new VisualGameObject(
    turret.image,
    turret.x,
    turret.y,
    2
  );
  turret.gun.sprite.initFrames(7,5);
  turret.gun.sprite.setFrame(0,1);
  g_GameObjectManager.addGameObject(turret.gun);
}
Turret.weapon.gun.shoot = function(turret) {
  var bullet = new Bullet(
    Bullet.gun,
    turret.x + turret.sprite.width / 2,
    turret.y + turret.sprite.height / 2,
    turret.angle,
    -1
  );
  
  turret.gun.sprite = AnimatedSprite(turret.gun.sprite, [2,3,4,5], 0.5);
  
  g_GameObjectManager.addGameObject(bullet);
}

// missile
Turret.weapon.missile;

// laser
Turret.weapon.laser = {
    range     : 800
};
Turret.weapon.laser.init = function(turret) {
  turret.gun = new VisualGameObject(
    turret.image,
    turret.x,
    turret.y,
    2
  );
  turret.gun.sprite.initFrames(7,5);
  turret.gun.sprite.setFrame(0,3);
  g_GameObjectManager.addGameObject(turret.gun);
};
Turret.weapon.laser.shoot = function(turret) {
  var bullet = new Bullet(
    Bullet.laser,
    turret.x + turret.sprite.width / 2 - Math.sin(turret.angle) * -22,
    turret.y + turret.sprite.height / 2 - Math.cos(turret.angle) * 22,
    turret.angle,
    -1
  );
  g_GameObjectManager.addGameObject(bullet);
  
  turret.gun.sprite = AnimatedSprite(turret.gun.sprite, [1,2], 0.25);
  
  turret.bullet = bullet;
  bullet.turret = turret;
};

// twin
Turret.weapon.twin;