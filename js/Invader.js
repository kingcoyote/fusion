function Invader(type, x, y) {
  this.team = 1;
  this.destructible = true;
  this.type = {};
  this.dead = false;
  this.health = 1;
  this.armor = 0;

  this.type = Invader.invaders['invader' + type];
  this.health = this.type.health;
  this.points = this.type.points;
  this.cooldown = Math.random() * this.type.cooldown;
  this.original_y = y;
  VisualGameObject.call(this, g_ResourceManager[Invader.invaders['invader' + type].image], x, y, this.type.z);
};

Invader.prototype = new VisualGameObject;


Invader.prototype.shoot = function() {
  for(var i in this.type.gun) {
    gun = this.type.gun[i];
    g_GameObjectManager.addGameObject(new Bullet(this.x + gun.x, this.y + gun.y, 1));
    g_GameObjectManager.addGameObject(TempGameObject(new VisualGameObject(g_ResourceManager.flashDown, this.x + gun.x - 27 , this.y + gun.y, 5), 0.1));
  }

  this.cooldown = this.type.cooldown + (Math.random() * this.type.cooldown);
};

Invader.prototype.shutdown = function() {
	this.dead = true;
	var explosion = new VisualGameObject(
    g_ResourceManager.explosion, 
    this.x + (this.type.width / 2) - 62,
    this.y + (this.type.height / 2) - 62,
    1
  );
	explosion.sprite.initFrames(5);
	explosion.sprite = AnimatedSprite(explosion.sprite, [1,2,3,4], 0.5, false);
	TempGameObject(explosion, 0.50);
	g_GameObjectManager.addGameObject(explosion);
  VisualGameObject.prototype.shutdown.call(this);
};

Invader.invaders = {
  invader1 : { image : 'invader1', width: 35, height: 45, gun : [{ x : 17, y : 41 }], cooldown: 1.5, health: 10, points : 10, z:1 },
  invader2 : { image : 'invader2', width: 50, height: 49, gun : [{ x : 25, y : 44 }], cooldown: 1.0, health: 30, points : 30, z:1 },
  invader3 : { image : 'invader3', width: 54, height: 89, gun : [{ x : 11, y : 40 }, { x : 43, y : 40}], cooldown: 1.5, health: 50, points:65, z:1 },
  invader4 : { image : 'invader4', width: 120, height: 106, gun : [{ x : 18, y : 57 }, { x : 100, y : 57}, { x : 59, y : 105}], cooldown: 1, health: 150, points:200, z:1 },
  invader5 : { image : 'invader5', width: 75, height: 72, gun : [{ x : 37, y : 52 }], cooldown: 0.5, health: 80, points: 100, z:1 },
  invader6 : { image : 'bossWingLeft', width: 214, height: 281, gun : [{ x : 86, y : 280}], cooldown: 0.75, health: 200, points:0, z:2 },
  invader7 : { image : 'bossWingRight', width: 214, height: 281, gun : [{ x : 127, y : 280}], cooldown: 0.75, health: 200, points:0, z:2 },
  invader8 : { image : 'bossBody', width: 184, height: 234, gun : [{ x : 16, y : 223}, { x : 92, y : 186}, { x : 167, y : 223}], cooldown: 0.5, health: 250, points:0, z:1 }
};

function InvaderController(level) {
  this.invaders = [];
  this.countdown = 3;
  this.level = level;
  this.wave = InvaderWaves[level];
  this.interval = this.wave.duration / this.wave.invaders.length;
  GameObject.call(this, 15, 15, -1);
};

InvaderController.prototype = new GameObject();

InvaderController.prototype.update = function(dt) {
  if(this.countdown > 0) {
    this.countdown -= dt;
    if(this.countdown <= 0) {
      var new_invader = new Invader(
        this.wave.invaders.splice(0,1), 
        Math.random() * (g_GameObjectManager.canvas.width - 50) + 25,
        50
      );
      this.invaders.push(new_invader);
      g_GameObjectManager.addGameObject(new_invader);
    }
    g_countdown = this.countdown;
    g_ApplicationManager.updateCountdown();
    return;
  }
  
  this.interval -= dt;
  this.wave.duration -= dt;
  if(this.interval <= 0 && this.wave.invaders.length > 0) {
    var new_invader = new Invader(
      this.wave.invaders.splice(0,1), 
      Math.random() * (g_GameObjectManager.canvas.width - 50) + 25,
      50
    );
    this.invaders.push(new_invader);
    g_GameObjectManager.addGameObject(new_invader);
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
    GameObject.prototype.shutdown.call(this);
  };
};

var InvaderWaves = [ null, 
   { duration : 10, invaders : [1,1,1,1,1,1,1,1] },
 ];
