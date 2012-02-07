/**
    A class to represent the player on the screen
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
 */
function Bullet() {
  this.speed        = 500; // base speed
  this.direction = 0;
  /**
   * construct the player object
   * 
   * @param level
   * @return
   */
  this.startupBullet = function(x, y, direction) {
    this.direction = direction;
    if(direction == 1) {
      this.startupVisualGameObject(g_ResourceManager.bulletDown, x-10, y, 1);
    } else {
      this.startupVisualGameObject(g_ResourceManager.bulletUp, x-10, y-60, 1);
      this.speed = 0 - this.speed;
    }
    
    return this;
  }

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
        object.shutdownDestructibleGameObject();
        this.shutdownVisualGameObject();
        g_score += object.points;
        g_ApplicationManager.updateScore();
        break;
      };
    }
  }
  
  this.collision_area = function() {
    return new Rectangle().startupRectangle(this.x+2.5, this.direction == 1 ? this.y + 62.5 : this.y+2.5, 15, 15);
  };
}

Bullet.prototype = new VisualGameObject;
