function Invader() {
  this.invaders = {
    invader1 : { image : g_ResourceManager.invader1, width: 35, height: 45, gun : { x : 17, y : 41 } },
    invader2 : { image : g_ResourceManager.invader2, width: 50, height: 49, gun : { x : 25, y : 44 } },
    invader3 : { image : g_ResourceManager.invader3, width: 54, height: 89, gun : { x : 27, y : 84 } }
  };
  
  this.controller = false;
  
  this.team = -1;
  
  this.original_y = 0;
  
  this.destructible = true;
  
  this.type = {};
  
  this.startupInvader = function(type, x, y, controller) {
    this.controller = controller;
    this.type = this.invaders['invader' + type];
    this.original_y = y;
    this.startupVisualGameObject(this.invaders['invader' + type].image, x, y, 1);
  };
  
  this.update = function(dt, context, xScroll, yScroll) {
    this.x += dt * this.controller.x_speed
    this.y = this.original_y + this.controller.y_drop;
  };
  
  this.collision_area = function() {
    return new Rectangle().startupRectangle(this.x, this.y, this.type.width, this.type.height);
  }
  
  this.create_bullet = function() {
    var bullet = new Bullet().startupBullet(this.x + this.type.gun.x, this.y + this.type.gun.y, 1);
    var flash = new VisualGameObject().startupVisualGameObject(g_ResourceManager.flashDown, this.x + this.type.gun.x - 27 , this.y + this.type.gun.y);
    var self = this;
    /*flash.update = function() { 
      this.x = self.x + self.type.gun.x - 27;
    }*/
    setTimeout(function(){flash.shutdownVisualGameObject();}, 125);
  };
  
  this.shutdownDestructibleGameObject = function() {
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
  }
}


Invader.prototype = new VisualGameObject();