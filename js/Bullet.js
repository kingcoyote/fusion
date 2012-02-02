/**
    A class to represent the player on the screen
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
 */
function Bullet() {
  this.speed        = 500; // base speed

  /**
   * construct the player object
   * 
   * @param level
   * @return
   */
  this.startupBullet = function(x, y, direction) {
    if(direction == 1) {
      this.startupVisualGameObject(g_ResourceManager.bulletDown, x-10, y+60, 1);
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
    
    if(this.y + 80 < 0 || this.y - 80 > g_GameObjectManager.canvas.height) {
      this.shutdownVisualGameObject();
    }
  }
}

Bullet.prototype = new VisualGameObject;
