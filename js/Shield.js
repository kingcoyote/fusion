Shield = function() {
  this.team = 0;
  this.destructible = true;
  this.points = 0;
  this.startupShield = function(x, y) {
    this.startupVisualGameObject(g_ResourceManager.shield, x, y);
  };
  
  this.collision_area = function() {
    return new Rectangle().startupRectangle(this.x, this.y, 15, 15);
  };
  
  this.shutdownDestructibleGameObject = function() {
    this.shutdownVisualGameObject();
  } ;
};

Shield.prototype = new VisualGameObject;
