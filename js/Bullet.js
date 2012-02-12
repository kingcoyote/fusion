/**
    A class to represent the player on the screen
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
 */
function Bullet() {
  this.speed        = 500; // base speed
  this.direction = 0;
  this.width = 12;
  this.height = 40;
  this.damage = 10;
  /**
   * construct the player object
   * 
   * @param level
   * @return
   */
  this.startupBullet = function(x, y, direction) {
    this.direction = direction;
    if(direction == 1) {
      this.startupVisualGameObject(g_ResourceManager.bulletDown, x - (this.width/2), y, 1);
    } else {
      this.startupVisualGameObject(g_ResourceManager.bulletUp, x - (this.width/2), y - this.width, 1);
      this.speed = 0 - this.speed;
    }
    
    return this;
  };

  /**
    Updates the object
    @param number  The time since the last frame in seconds
    @param context The drawing context
    @param number  The global scrolling value of the x axis
    @param number  The global scrolling value of the y axis
   */
  this.update = function (dt, context, xScroll, yScroll) {
    this.y += this.speed * dt;
    
    if(this.y + 80 - yScroll < 0 || this.y - 80 > g_GameObjectManager.canvas.height) {
      this.shutdownVisualGameObject();
    }
    
    for(var i in g_GameObjectManager.gameObjects) {
      var object = g_GameObjectManager.gameObjects[i];
      if(object.destructible && this.direction != object.team && this.collision_area().intersects(object.collision_area())) {
        if(object.invulnerable > 0) {
          break;
        }
        object.health -= this.damage;
        g_ApplicationManager.updateHealth();
        if(object.health <= 0) {
          object.shutdownDestructibleGameObject();
          g_score += object.points;
          g_ApplicationManager.updateScore();
        }
        this.die();
        break;
      };
    }
  };
  
  this.die = function() {
    if(this.direction == 1) {
      image = g_ResourceManager.smallExploRed;
      x_offset = -14;
      y_offset = 14;
    } else {
      image = g_ResourceManager.smallExploBlue;
      x_offset = -14;
      y_offset = -14;
    }
    var explosion = new AnimatedGameObject().startupAnimatedGameObject(
        image, 
        this.x + x_offset,
        this.y + y_offset,
        1,
        5,
        10
    );
    setTimeout(function(){ explosion.shutdownAnimatedGameObject();}, 500);
    this.shutdownVisualGameObject();
  };
}

Bullet.prototype = new VisualGameObject;
