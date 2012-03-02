function Bullet(x, y, angle, team) {
  this.speed = 50; // base speed
  this.angle = angle;
  this.image = g_ResourceManager.bullet;
  
  VisualGameObject.call(
    this, 
    this.image, 
    x + (Math.cos(this.angle) * (this.image.width / 2)), 
    y + (Math.sin(this.angle) * (this.image.height - this.image.width / 2)), 
    1
  );
  
  this.sprite.rotate(this.angle);
};

Bullet.prototype = new VisualGameObject;

Bullet.prototype.update = function (dt) {
  this.x += this.speed * Math.cos(this.angle) * dt;
  this.y += this.speed * Math.sin(this.angle) * dt;
};
