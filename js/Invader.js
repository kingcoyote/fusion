function Invader() {
  this.invaders = {
    invader1 : { image : g_ResourceManager.invader1, width: 35, height: 45 },
    invader2 : { image : g_ResourceManager.invader2, width: 50, height: 49 },
    invader3 : { image : g_ResourceManager.invader3, width: 54, height: 89 }
  };
  
  this.team = -1;
  
  this.original_y = 0;
  
  this.destructible = true;
  
  this.startupInvader = function(type, x, y) {
    this.type = this.invaders['invader' + type];
    this.original_y = y;
    this.startupVisualGameObject(this.invaders['invader' + type].image, x, y, 1);
  };
  
  this.update = function(dt, context, xScroll, yScroll) {
    
    if(this.x + this.type.width  + 15 > g_GameObjectManager.canvas.width) {
      Invader.y_offset += 15;
      Invader.x_move = -1;
      Invader.speed += Invader.speed_increment;

    }
    
    if(this.x < 15) {
      Invader.y_offset += 15;
      Invader.x_move = 1;
      Invader.speed += Invader.speed_increment;

    }
    console.log(dt, Invader.cooldown);
    Invader.cooldown -= dt;
    
    if(Math.random() > 0.50 && Invader.cooldown <= 0) {
      Invader.cooldown = Invader.fire_speed;
      bullet = new Bullet().startupBullet(this.x + this.type.width / 2, this.y + this.type.height, 1);
    }
    
    this.x += dt * Invader.speed * Invader.x_move;
    this.y = this.original_y + Invader.y_offset;
  };
  
  this.collision_area = function() {
    return new Rectangle().startupRectangle(this.x, this.y, this.type.width, this.type.height);
  }
  
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

Invader.x_move = 1;
Invader.y_offset = 0;
Invader.speed  = 50;
Invader.speed_increment = 15;
Invader.cooldown = 0;
Invader.fire_speed = 5;


Invader.prototype = new VisualGameObject();