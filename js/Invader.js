function Invader() {
  this.invaders = {
    invader1 : { image : g_ResourceManager.invader1, width: 35, height: 45, gun : [{ x : 17, y : 41 }], cooldown: 1.5, health: 10, points : 10, z:1 },
    invader2 : { image : g_ResourceManager.invader2, width: 50, height: 49, gun : [{ x : 25, y : 44 }], cooldown: 1.0, health: 30, points : 30, z:1 },
    invader3 : { image : g_ResourceManager.invader3, width: 54, height: 89, gun : [{ x : 11, y : 40 }, { x : 43, y : 40}], cooldown: 1.5, health: 50, points:65, z:1 },
    invader4 : { image : g_ResourceManager.invader4, width: 120, height: 106, gun : [{ x : 18, y : 57 }, { x : 100, y : 57}, { x : 59, y : 105}], cooldown: 1, health: 150, points:200, z:1 },
    invader5 : { image : g_ResourceManager.invader5, width: 75, height: 72, gun : [{ x : 37, y : 52 }], cooldown: 0.5, health: 80, points: 100, z:1 },
    invader6 : { image : g_ResourceManager.bossWingLeft, width: 214, height: 281, gun : [{ x : 86, y : 280}], cooldown: 0.75, health: 200, points:0, z:2 },
    invader7 : { image : g_ResourceManager.bossWingRight, width: 214, height: 281, gun : [{ x : 127, y : 280}], cooldown: 0.75, health: 200, points:0, z:2 },
    invader8 : { image : g_ResourceManager.bossBody, width: 184, height: 234, gun : [{ x : 16, y : 223}, { x : 92, y : 186}, { x : 167, y : 223}], cooldown: 0.5, health: 250, points:0, z:1 }
  };
  
  this.controller = false;
  this.team = 1;
  this.original_y = 0;
  this.destructible = true;
  this.type = {};
  this.dead = false;
  this.health = 1;
  this.armor = 0;
  
  this.startupInvader = function(type, x, y) {
    this.type = this.invaders['invader' + type];
    this.health = this.type.health;
    this.points = this.type.points;
    this.cooldown = Math.random() * this.type.cooldown;
    this.original_y = y;
    this.startupVisualGameObject(this.invaders['invader' + type].image, x, y, this.type.z);
    
    return this;
  };
  
  this.update = function(dt, context, xScroll, yScroll) {
    
  };
  
  this.shoot = function() {
    for(var i in this.type.gun) {
      gun = this.type.gun[i];
      new Bullet().startupBullet(this.x + gun.x, this.y + gun.y, 1);
      new TempVisualGameObject().startupTempVisualGameObject(g_ResourceManager.flashDown, this.x + gun.x - 27 , this.y + gun.y, 5, 0.05);
    }

    this.cooldown = this.type.cooldown + (Math.random() * this.type.cooldown);
  };
  
  this.shutdownDestructibleGameObject = function() {
  	this.dead = true;
  	var explosion = new VisualGameObject().startupVisualGameObject(
      g_ResourceManager.explosion, 
      this.x + (this.type.width / 2) - 62,
      this.y + (this.type.height / 2) - 62,
      1
    );
  	explosion.sprite.initFrames(5);
  	explosion.sprite = AnimatedSprite(explosion.sprite, [1,2,3,4], 0.5, false);
    this.shutdownVisualGameObject();
    setTimeout(function(){ explosion.shutdownVisualGameObject();}, 500);
  };
}


Invader.prototype = new VisualGameObject;

var InvaderWaves = [ null, 
   { duration : 10, invaders : [1,1,1,1,1,1,1,1] },
 ];

function InvaderController() {
  this.invaders = [];
  this.countdown = 3;
  this.wave = null;
  
  this.startupInvaderController = function(level) {
    this.startupGameObject(15, 15, -1);
    this.level = level;
    this.wave = InvaderWaves[this.level];
    this.interval = this.wave.duration / this.wave.invaders.length;
  };
  
  this.update = function(dt, context, xScroll, yScroll) {
    if(this.countdown > 0) {
      this.countdown -= dt;
      if(this.countdown <= 0) {
        this.invaders.push(new Invader().startupInvader(
          this.wave.invaders.splice(0,1), 
          Math.random() * (g_GameObjectManager.canvas.width - 50) + 25,
          50
        ));
      }
      g_countdown = this.countdown;
      g_ApplicationManager.updateCountdown();
      return;
    }
    
    this.interval -= dt;
    this.wave.duration -= dt;
    if(this.interval <= 0) {
      this.invaders.push(new Invader().startupInvader(
        this.wave.invaders.splice(0,1), 
        Math.random() * (g_GameObjectManager.canvas.width - 50) + 25,
        50
      ));
      this.interval = this.wave.duration / this.wave.invaders.length;
    }
    
    alive = false;
    for(var i in this.invaders) {
      if(this.invaders[i].dead) continue;
      alive = true;
    };
    if(alive === false) {
      g_level++;
      g_ApplicationManager.updateLevel();
      if(! InvaderWaves[g_level]) {
        g_ApplicationManager.gameOver('Congratulations for beating game!');
      }
      setTimeout(function(){
        g_store.showStore();
      }, 3000);
      this.shutdownGameObject();
    }
  };
}

InvaderController.prototype = new GameObject;

