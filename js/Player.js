/**
    A class to represent the player on the screen
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
 */
function Player() {
  this.speed        = 275; // base speed. between 50 and 500 is reasonable. 275 is default
  this.left         = false;
  this.right        = false;
  this.fire         = false;
  this.cooldown     = 0;
  this.screenBorder = 20;
  this.fire_speed   = 0.50; // weapon cooldown in seconds. 0.5 is default

  this.gun = { x : 50, y : 15 };
  
  this.team = 1;
  
  this.destructible = true;
  
  /**
   * construct the player object
   * 
   * @param level
   * @return
   */
  this.startupPlayer = function() {
    this.startupVisualGameObject(g_ResourceManager.hammer, g_GameObjectManager.canvas.width / 2 - 50, g_GameObjectManager.canvas.height - 100);
    return this;
  }

  this.keyDown = function(event) {
    this.left  = event.keyCode == 37 ? true : this.left;
    this.right = event.keyCode == 39 ? true : this.right;
    this.fire  = event.keyCode == 32 ? true : this.fire;
  }

  this.keyUp = function(event)
  {
    this.left  = event.keyCode == 37 ? false : this.left;
    this.right = event.keyCode == 39 ? false : this.right;
    this.fire  = event.keyCode == 32 ? false : this.fire;
  }

  /**
    Updates the object
    @param number  The time since the last frame in seconds
    @param context The drawing context
    @param number  The global scrolling value of the x axis
    @param number  The global scrolling value of the y axis
   */
  this.update = function (dt, context, xScroll, yScroll) {
    if (this.left) {
      this.x -= this.speed * dt;
    }
    if (this.right) {
      this.x += this.speed * dt;
    }
    
    if(this.x - 15 <= 0) {
      this.x = 15;
    }
    if(this.x + 115 >= g_GameObjectManager.canvas.width) {
      this.x = g_GameObjectManager.canvas.width - 115;
    }
    
    this.cooldown -= dt;
    if(this.fire && this.cooldown <= 0) {
      this.cooldown = this.fire_speed;
      this.shoot();
    }
  }
  
  this.shoot = function() {
    var bullet = new Bullet().startupBullet(this.x + this.gun.x, this.y + this.gun.y, -1);
  };
  
  this.shutdownDestructibleGameObject = function() {
    var explosion = new AnimatedGameObject().startupAnimatedGameObject(
        g_ResourceManager.explosion, 
        this.x + (100 / 2) - 62,
        this.y + (85 / 2) - 62,
        1,
        5,
        10
    );
    this.shutdownVisualGameObject();
    setTimeout(function(){ explosion.shutdownAnimatedGameObject();}, 500);
  }
  
  this.collision_area = function() {
    return new Rectangle().startupRectangle(this.x, this.y, 100, 85);
  };
}

Player.prototype = new VisualGameObject;
