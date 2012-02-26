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
  
  this.startupInvader = function(type, x, y, controller) {
    this.controller = controller;
    this.type = this.invaders['invader' + type];
    this.health = this.type.health;
    this.points = this.type.points;
    this.cooldown = Math.random() * this.type.cooldown;
    this.original_y = y;
    this.startupVisualGameObject(this.invaders['invader' + type].image, x, y, this.type.z);
  };
  
  this.update = function(dt, context, xScroll, yScroll) {
    this.x += dt * this.controller.x_speed;
    this.y = this.original_y + this.controller.y_drop + yScroll;
    this.cooldown -= dt;
    if(this.cooldown <= 0) {
      this.shoot();
    }
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
   {speed_increment : 15, row_drop : 5, x_speed : 150,
     invaders : [[1, 15, 16],[1, 58, 16],[1, 100, 16],[1, 143, 16],[1, 36, 67],[1, 82, 67],[1, 126, 67]] },
   {speed_increment : 15, row_drop : 5, x_speed : 150,
     invaders : [[1, 15, 16],[2, 57, 16],[1, 114, 16],[1, 143, 67],[1, 171, 16],[2, 213, 16],[1, 270, 16],[1, 299, 67],[1, 324, 16],[2, 366, 16],[1, 423, 16]] },
   {speed_increment : 15, row_drop : 5, x_speed : 150,
     invaders : [[2, 15, 16],[1, 83, 16],[1, 125, 16],[1, 167, 16],[1, 105, 66],[1, 148, 66],[2, 212, 16],[2, 270, 16],[2, 243, 72],[1, 330, 16],[1, 372, 16],[1, 413, 16],[1, 352, 66],[1, 396, 66],[2, 466, 16]] },
   {speed_increment : 15, row_drop : 5, x_speed : 150,
     invaders : [[1,71,16],[2,115,16],[3,172,16],[2,233,16],[1,291,16],[1,88,70],[1,138,78],[1,234,78],[1,276,70]] }, 
   {speed_increment : 15, row_drop : 5, x_speed : 150,
     invaders : [[2,15,16],[2,72,16],[2,45,70],[3,130,16],[3,191,16],[2,256,16],[2,313,16],[2,284,70],[1,102,111],[1,172,121],[1,235,111]] }, 
   {speed_increment : 15, row_drop : 5, x_speed : 150,
     invaders : [[5, 15, 16],[5, 100, 16],[5, 185, 16]] },
   {speed_increment : 15, row_drop : 5, x_speed : 150,
     invaders : [[2,15,16],[5,75,16],[3,170,16],[5,242,16],[2,330,16],[1,30,77],[2,91,97],[1,150,118],[1,205,118],[2,251,97],[1,328,77]] },
   {speed_increment : 15, row_drop : 5, x_speed : 150,
     invaders : [[1, 47, 194],[1, 98, 194],[1, 149, 194],[1, 200, 194],[1, 251, 194],[1, 302, 194],[1, 353, 194],[2, 27, 133],[2, 80, 133],[2, 314, 133],[2, 365, 133],[5, 36, 51],[5, 328, 51],[4, 161, 78]] },
   {speed_increment : 15, row_drop : 5, x_speed : 150,
     invaders : [[4,15,17],[3,152,58],[2,207,17],[3,258,58],[4,331,17],[1,214,86],[1,23,142],[5,66,135],[2,161,156],[2,254,156],[5,320,135],[1,400,142]] },
   {speed_increment : 15, row_drop : 5, x_speed : 150,
     invaders : [[8, 207, 17],[6, 69, 52],[7, 315, 52]] },
 ];

function InvaderController() {
  this.invaders = [];
  this.row_drop = 0;
  this.speed_increment = 0;
  this.x_speed = 0;
  this.y_drop = 0;
  this.countdown = 3;
  
  this.startupInvaderController = function(level) {
    this.startupGameObject(15, 15, -1);
    this.level = level;
  };
  
  this.initInvaders = function() {
    this.speed_increment = InvaderWaves[this.level].speed_increment;
    this.row_drop = InvaderWaves[this.level].row_drop;
    this.x_speed = InvaderWaves[this.level].x_speed;
    for(var i in InvaderWaves[this.level].invaders) {
      var invader = new Invader();
      invader.startupInvader(
        InvaderWaves[this.level].invaders[i][0],
        InvaderWaves[this.level].invaders[i][1],
        InvaderWaves[this.level].invaders[i][2],
        this
      );
      this.invaders.push(invader);
    }
  };
  
  this.update = function(dt, context, xScroll, yScroll) {
    if(this.countdown > 0) {
      this.countdown -= dt;
      if(this.countdown <= 0) {
        this.initInvaders();
      }
      g_countdown = this.countdown;
      g_ApplicationManager.updateCountdown();
      return;
    }
      
    alive = false;
    for(var i in this.invaders) {
      if(this.invaders[i].dead) continue;
      if(this.invaders[i].y > g_GameObjectManager.canvas.height + this.invaders[i].type.height - 300) {
        g_GameObjectManager.endLoop();
      }
      alive = true;
      if(this.invaders[i].x + this.invaders[i].type.width + 15 > 1024) {
        this.y_drop += this.row_drop;
        this.x_speed = 0 - (Math.abs(this.x_speed) + this.speed_increment);
      }
      
      if(this.invaders[i].x < 15) {
        this.y_drop += this.row_drop;
        this.x_speed = Math.abs(this.x_speed) + this.speed_increment;
      }
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

