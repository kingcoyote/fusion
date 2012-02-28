function Bullet(x, y, direction) {
  this.speed = 500; // base speed

  this.direction = direction;
  
  if(direction == 1) {
    VisualGameObject.call(this, g_ResourceManager.bulletDown, x - (g_ResourceManager.bulletDown.width/2), y, 1);
  } else {
    VisualGameObject.call(this, g_ResourceManager.bulletUp, x - (g_ResourceManager.bulletUp.width/2), y - g_ResourceManager.bulletDown.width, 1);
    this.speed = 0 - this.speed;
  }
};

Bullet.prototype = VisualGameObject;

Bullet.prototype.update = function (dt) {
  this.y += this.speed * dt;

  if(this.y + 80 - yScroll < 0 || this.y - 80 > g_GameObjectManager.canvas.height) {
    VisualGameObject.prototype.shutdown.call(this);
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
        object.shutdown();
        g_score += object.points;
        g_ApplicationManager.updateScore();
      }
      this.die();
      break;
    };
  }
};

Bullet.prototype.die = function() {
  if(this.direction == 1) {
    image = g_ResourceManager.smallExploRed;
    x_offset = (this.sprite.width/2) - (image.height/2);
    y_offset = (this.sprite.height) - (this.sprite.width/2) - (image.height/2);
  } else {
    image = g_ResourceManager.smallExploBlue;
    x_offset = (this.sprite.width/2) - (image.height/2);
    y_offset = (this.sprite.width/2) - (image.height/2);
  }
  var explosion = new VisualGameObject(
    image, 
    this.x + x_offset,
    this.y + y_offset,
    1
  );
  explosion.sprite.initFrames(5);
  explosion.sprite = AnimatedSprite(explosion.sprite, [1,2,3,4], 0.25, false);
  
  TempGameObject(explosion, 0.25);
  g_GameObjectManager.addGameObject(explosion);
  VisualGameObject.prototype.shutdown.call(this);
};
