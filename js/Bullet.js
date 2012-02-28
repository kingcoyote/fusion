function Bullet() {
  this.speed        = 500; // base speed
  this.direction = 0;
  this.width = 12;
  this.height = 40;
  this.damage = 10;
  
  this.startupBullet = function(x, y, direction) {
    this.direction = direction;
    if(direction == 1) {
      this.startupVisualGameObject(g_ResourceManager.bulletDown, x - (g_ResourceManager.bulletDown.width/2), y, 1);
    } else {
      this.startupVisualGameObject(g_ResourceManager.bulletUp, x - (g_ResourceManager.bulletUp.width/2), y - g_ResourceManager.bulletDown.width, 1);
      this.speed = 0 - this.speed;
    }
    
    return this;
  };

  
  this.update = function (dt, context, xScroll, yScroll) {
    this.y += this.speed * dt;
    
    if(this.y + 80 - yScroll < 0 || this.y - 80 > g_GameObjectManager.canvas.height) {
      this.shutdownVisualGameObject();
      return;
    }
    
    for(var i in g_GameObjectManager.gameObjects) {
      var object = g_GameObjectManager.gameObjects[i];
      if(object.destructible && this.direction != object.team && this.collisionArea().intersects(object.collisionArea())) {
        if(object.invulnerable > 0) {
          break;
        }
        var damage = (this.damage - object.armor);
        object.health -= (damage >= 1 ? damage : 1);
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
      x_offset = (this.sprite.width/2) - (image.height/2);
      y_offset = (this.sprite.height) - (this.sprite.width/2) - (image.height/2);
    } else {
      image = g_ResourceManager.smallExploBlue;
      x_offset = (this.sprite.width/2) - (image.height/2);
      y_offset = (this.sprite.width/2) - (image.height/2);
    }
    var explosion = new VisualGameObject().startupVisualGameObject(
        image, 
        this.x + x_offset,
        this.y + y_offset,
        1
    );
    explosion.sprite.initFrames(5);
    explosion.sprite = AnimatedSprite(explosion.sprite, [1,2,3,4], 0.25, false);
    
    TempGameObject(explosion, 0.25);
    
    this.shutdownVisualGameObject();
  };
}

Bullet.prototype = new VisualGameObject;
