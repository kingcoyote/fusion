Shield = function() {
  this.team = 0;
  this.destructible = true;
  this.points = 0;
  this.health = Shield.stats.health;
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

Shield.shieldHealth = function() {
  Shield.stats.health += 10;
  g_ApplicationManager.startShields();
  Shield.StoreInventory.increasehealth.cost += 25;
};

Shield.StoreInventory = {
  shieldrestore :   { name: "Shield Restore", icon : "shieldrestore", cost: 150, callback: Shield.shieldRestore },
  increasehealth : { name : "Increase Health", icon : "shieldhealth", cost:150, callback: Shield.shieldHealth }
};

Shield.stats = {
  health : 10
};