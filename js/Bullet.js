function Bullet(x, y, angle) {
  this.speed = 500; // base speed
  this.angle = angle;
  this.image = g_ResourceManager.bullet;
  
  VisualGameObject.call(
    this, 
    this.image, 
    x - (this.image.width / 2), 
    y - (this.image.height / 2), 
    10
  );
  
  this.sprite.rotate(this.angle);
};

Bullet.prototype = new VisualGameObject;

Bullet.prototype.update = function (dt) {
  this.x += this.speed * Math.sin(this.angle) * dt;
  this.y -= this.speed * Math.cos(this.angle) * dt;
};
