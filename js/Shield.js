Shield = function() {
  this.team = 0;
  this.destructible = true;

  this.startupShield(x, y) {
    this.startupVisualGameObject(g_ResourceManager.shield, x, y);
  };
  
  this.collision_area = function() {
    return new Rectangle.startupRectangle(this.x, this.y, 15, 15);
  };
  
  
};

Shield.prototype = new VisualGameObject;
