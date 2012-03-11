function Bullet(x, y, angle, team) {
  this.speed = 650; // base speed
  this.damage = 10;
  this.team = team;
  this.angle = angle;
  this.image = g_ResourceManager.bulletUp;
  
  VisualGameObject.call(
    this, 
    this.image, 
    x - this.image.width / 2, 
    y - this.image.height / 2, 
    -1
  );
  
  this.sprite.rotate(this.angle);
};

Bullet.prototype = new VisualGameObject;

Bullet.prototype.update = function (dt) {
  this.x += this.speed * Math.sin(this.angle) * dt;
  this.y -= this.speed * Math.cos(this.angle) * dt;
  
  if(this.y + 80 < 0 || this.y - 80 > g_GameObjectManager.canvas.height) {
    VisualGameObject.prototype.shutdown.call(this);
    return;
  }

  for(var i in g_GameObjectManager.gameObjects) {
    var object = g_GameObjectManager.gameObjects[i];
    if(object.destructible && this.team != object.team && this.collisionArea().intersects(object.collisionArea())) {
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
  this.shutdown();
};
