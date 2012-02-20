function Invader() {
  this.invaders = {
    invader1 : { image : g_ResourceManager.invader1, width: 35, height: 45, gun : { x : 17, y : 41 }, cooldown: 2.5, health: 10 },
    invader2 : { image : g_ResourceManager.invader2, width: 50, height: 49, gun : { x : 25, y : 44 }, cooldown: 2.5, health: 10 },
    invader3 : { image : g_ResourceManager.invader3, width: 54, height: 89, gun : { x : 27, y : 84 }, cooldown: 2.5, health: 20 },
	invader4 : { image : g_ResourceManager.invader4, width: 120, height: 106, gun : { x : 59, y : 105 }, cooldown: 2.5, health: 50 },
	invader5 : { image : g_ResourceManager.invader5, width: 75, height: 72, gun : { x : 37, y : 52 }, cooldown: 2.5, health: 30 }
  };
  
  this.points = 10;
  this.controller = false;
  this.team = 1;
  this.original_y = 0;
  this.destructible = true;
  this.type = {};
  this.dead = false;
  this.health = 1;
  
  this.startupInvader = function(type, x, y, controller) {
    this.controller = controller;
    this.type = this.invaders['invader' + type];
    this.health = this.type.health;
    this.cooldown = Math.random() * this.type.cooldown;
    this.original_y = y;
    this.startupVisualGameObject(this.invaders['invader' + type].image, x, y, 1);
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
    new Bullet().startupBullet(this.x + this.type.gun.x, this.y + this.type.gun.y, 1);
    new TempVisualGameObject().startupTempVisualGameObject(g_ResourceManager.flashDown, this.x + this.type.gun.x - 27 , this.y + this.type.gun.y, 5, 0.05);

    this.cooldown = this.type.cooldown + (Math.random() * this.type.cooldown);
  };
  
  this.shutdownDestructibleGameObject = function() {
	this.dead = true;
	var explosion = new AnimatedGameObject().startupAnimatedGameObject(
        g_ResourceManager.explosion, 
        this.x + (this.type.width / 2) - 62,
        this.y + (this.type.height / 2) - 62,
        1,
        5,
        10
    );
    this.shutdownVisualGameObject();
    setTimeout(function(){ explosion.shutdownAnimatedGameObject();}, 500);
  };
}


Invader.prototype = new VisualGameObject;
