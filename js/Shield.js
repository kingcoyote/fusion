Shield = function() {
  var self = this;
  this.team = 0;
  this.destructible = true;
  this.points = 0;
  this.health = 1;
  this.shield = true;
  this.startupShield = function(x, y) {
    this.startupVisualGameObject(g_ResourceManager.shield, x, y, 1);
  };
  
  this.shutdownDestructibleGameObject = function() {
    this.shutdownVisualGameObject();
  } ;
};

Shield.prototype = new VisualGameObject;

Shield.shieldRestore = function() {
  g_ApplicationManager.startShields();
};

Shield.StoreInventory = [
  /* shield restore */   { name: "Shield Restore", icon : "repairshields", cost: "150", callback: Shield.shieldRestore }
];