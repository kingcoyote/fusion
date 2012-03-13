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
  
  var flash = {};
  
  // get the polar coordinates of the center of the flash
  flash.angle = Math.PI;
  flash.distance = 17;
  
  // use them to find out how far flash center is from the bullet origin
  flash.x = Math.sin(angle - flash.angle) * flash.distance * -1;
  flash.y = Math.cos(angle - flash.angle) * flash.distance;
  
  flash.image = g_ResourceManager.flash;
  flash.object = new VisualGameObject(
      flash.image,
      x - flash.image.width / 2 + flash.x,
      y - flash.image.height / 2 + flash.y,
      10
  );
  TempGameObject(flash.object, 0.05);
  
  // rotate
  flash.object.sprite.rotate(angle);
  
  g_GameObjectManager.addGameObject(flash.object);
};

Bullet.prototype = new VisualGameObject;

Bullet.prototype.update = function (dt) {
  this.x += this.speed * Math.sin(this.angle) * dt;
  this.y -= this.speed * Math.cos(this.angle) * dt;
};
