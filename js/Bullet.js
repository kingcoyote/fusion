function Bullet(type, x, y, angle, team) {
  this.type = Bullet.types[type];
  this.team = team;
  this.angle = angle;
  this.x = x;
  this.y = y;
  this.type.init(this);
};

Bullet.prototype = new VisualGameObject;

Bullet.prototype.update = function (dt) {
  this.type.update(this, dt);
};

Bullet.prototype.shutdown = function() {
  this.type.shutdown(this);
  VisualGameObject.prototype.shutdown.call(this);
};

Bullet.gun     = "gun";
Bullet.missile = "missile";
Bullet.laser   = "laser";
Bullet.machinegun    = "machinegun";

Bullet.types = {};

Bullet.types.gun = {
  speed  : 650, // base speed
  damage : 10
};
Bullet.types.gun.init = function(bullet) {
  var x = bullet.x;
  var y = bullet.y;
  var image = g_ResourceManager.bulletUp;
  
  VisualGameObject.call(
    bullet, 
    image, 
    x - image.width / 2, 
    y - image.height / 2, 
    -1
  );
  
  bullet.sprite.rotate(bullet.angle);
  
  var flash = {};
  flash.distance = 17;
  flash.angle = Math.PI;
  flash.x = Math.sin(bullet.angle - flash.angle) * flash.distance * -1;
  flash.y = Math.cos(bullet.angle - flash.angle) * flash.distance;
  flash.image = g_ResourceManager.flashUp;
  
  flash.object = new VisualGameObject(
    flash.image, 
    x - (flash.image.width / 2) + flash.x, 
    y - (flash.image.height / 2) + flash.y, 
    5
  );
  TempGameObject(flash.object, 0.05);
  g_GameObjectManager.addGameObject(flash.object);
  
  flash.object.sprite.rotate(bullet.angle);
};
Bullet.types.gun.update = function(bullet, dt) {
  bullet.x += this.speed * Math.sin(bullet.angle) * dt;
  bullet.y -= this.speed * Math.cos(bullet.angle) * dt;
  
  if(bullet.y + 80 < 0 || bullet.y - 80 > g_GameObjectManager.canvas.height) {
    return bullet.shutdown();
  }

  for(var i in g_GameObjectManager.gameObjects) {
    var object = g_GameObjectManager.gameObjects[i];
    if(object.destructible && bullet.team != object.team && this.collisionArea(bullet).intersects(object.collisionArea())) {
      if(object.invulnerable > 0) {
        break;
      }
      var damage = (this.damage - object.armor);
      object.health -= (damage >= 1 ? damage : 1);
      g_ApplicationManager.updateHealth();
      bullet.shutdown();
      break;
    };
  }
};
Bullet.types.gun.shutdown = function(bullet) {
  var explosion = new VisualGameObject(g_ResourceManager.smallExploBlue, bullet.x - 20, bullet.y - 20, 10);
  explosion.sprite.initFrames(5);
  explosion.sprite = AnimatedSprite(explosion.sprite, [1,2,3,4], 0.3, false);
  TempGameObject(explosion, 0.3);
  g_GameObjectManager.addGameObject(explosion);
};
Bullet.types.gun.collisionArea = function(bullet) {
  return new Rectangle(bullet.x, bullet.y, bullet.sprite.width, bullet.sprite.height);
};

Bullet.types.missile = {
  speed : 250,
  radius : 100,
  detonate : 30,
  damage : 40,
  turn : Math.PI / 4
};
Bullet.types.missile.init = function(bullet) {
  var x = bullet.x;
  var y = bullet.y;
  var image = g_ResourceManager.missile;
  
  VisualGameObject.call(
    bullet, 
    image, 
    x - image.width / 2, 
    y - image.height / 2, 
    -1
  );
  
  bullet.sprite.rotate(bullet.angle);
};
Bullet.types.missile.update = function(bullet, dt) {
  if( ! bullet.turret.target.dead) {
    var target = {
        x : bullet.turret.target.x + bullet.turret.target.sprite.width  / 2,
        y : bullet.turret.target.y + bullet.turret.target.sprite.height / 2 
    };
    var self = {
        x : bullet.x + bullet.sprite.width  / 2,
        y : bullet.y + bullet.sprite.height / 2
    };
    var angle = Math.atan2(
      target.y - self.y, 
      target.x - self.x
    ) + Math.PI / 2;
    
    var direction = angle - bullet.angle > 0 ? 1 : -1;
    
    bullet.angle += Math.abs(angle - bullet.angle) > this.turn * dt ? this.turn * dt * direction : angle - bullet.angle;
    
    bullet.sprite.rotate(bullet.angle);
    
    if(Math.sqrt(Math.pow(target.y - self.y, 2) + Math.pow(target.x - self.x, 2)) <= this.detonate) {
      bullet.shutdown();
    }
  }
  
  bullet.x += this.speed * Math.sin(bullet.angle) * dt;
  bullet.y -= this.speed * Math.cos(bullet.angle) * dt;
  
  if(bullet.y + 80 < 0 || bullet.y - 80 > g_GameObjectManager.canvas.height) {
    return bullet.shutdown();
  }
};
Bullet.types.missile.shutdown = function(bullet) {
  var explosion = new VisualGameObject(
    g_ResourceManager.missileExplosion, 
    bullet.x + (bullet.sprite.width / 2) - 62,
    bullet.y + (bullet.sprite.height / 2) - 62,
    1
  );
  explosion.sprite.initFrames(6);
  explosion.sprite = AnimatedSprite(explosion.sprite, [1,2,3,4,5], 0.5, false);
  TempGameObject(explosion, 0.5);
  g_GameObjectManager.addGameObject(explosion);
  
  var hitbox = new Rectangle(
    bullet.x + bullet.sprite.width / 2 - this.radius / 2,
    bullet.y + bullet.sprite.height / 2 - this.radius / 2,
    this.radius,
    this.radius
  );
  
  for(var i in g_ApplicationManager.invaderController.invaders) {
    var invader = g_ApplicationManager.invaderController.invaders[i];
    if(!invader.dead && invader.collisionArea().intersects(hitbox)) {
      invader.health -= this.damage;
    }
  }
};

Bullet.types.laser = {
  damage : 10
};
Bullet.types.laser.init = function(bullet) {
  var x = bullet.x;
  var y = bullet.y;
  var image = g_ResourceManager.greenLaser;
  VisualGameObject.call(
    bullet, 
    image, 
    x - image.width / 2,
    y - image.height / 2, 
    -1
  );
  
  bullet.sprite.rotate(bullet.angle);
};
Bullet.types.laser.update = function(bullet, dt) {
  var distance = 0;
  
  bullet.angle = bullet.turret.angle;
  bullet.turret.cooldown = 1;
  
  if( ! bullet.turret.target.dead) {
    var x = (bullet.turret.target.x + bullet.turret.target.sprite.width  / 2) - (bullet.x + bullet.sprite.width / 2);
    var y = (bullet.turret.target.y + bullet.turret.target.sprite.height / 2) - (bullet.y + bullet.sprite.height / 2);
    distance = Math.sqrt((x*x) + (y*y));
  }

  bullet.sprite.setTiling(1, Math.ceil(distance / bullet.sprite.height));
  bullet.sprite.rotate(bullet.turret.angle);
  
  bullet.turret.target.health -= this.damage * dt;
  
  if(bullet.turret.target.dead == true) {
    bullet.shutdown();
    bullet.turret.gun.sprite.setFrame(0,3);
  }
};
Bullet.types.laser.shutdown = function(bullet) {
  bullet.turret.bullet = null;
};

Bullet.types.machinegun = {
  speed  : 850, // base speed
  damage : 5
};
Bullet.types.machinegun.init = function(bullet) {
  var x = bullet.x;
  var y = bullet.y;
  var image = g_ResourceManager.mgBullet;
  
  VisualGameObject.call(
    bullet, 
    image, 
    x - image.width / 2, 
    y - image.height / 2, 
    -1
  );
  
  bullet.sprite.rotate(bullet.angle);
};
Bullet.types.machinegun.update = function(bullet, dt) {
  bullet.x += this.speed * Math.sin(bullet.angle) * dt;
  bullet.y -= this.speed * Math.cos(bullet.angle) * dt;
  
  if(bullet.y + 80 < 0 || bullet.y - 80 > g_GameObjectManager.canvas.height) {
    return bullet.shutdown();
  }

  for(var i in g_GameObjectManager.gameObjects) {
    var object = g_GameObjectManager.gameObjects[i];
    if(object.destructible && bullet.team != object.team && this.collisionArea(bullet).intersects(object.collisionArea())) {
      if(object.invulnerable > 0) {
        break;
      }
      var damage = (this.damage - object.armor);
      object.health -= (damage >= 1 ? damage : 1);
      g_ApplicationManager.updateHealth();
      bullet.shutdown();
      break;
    };
  }
};
Bullet.types.machinegun.shutdown = function(bullet) {

};
Bullet.types.machinegun.collisionArea = function(bullet) {
  return new Rectangle(bullet.x, bullet.y, bullet.sprite.width, bullet.sprite.height);
};