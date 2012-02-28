Shield = function(x,y) {
  this.team = 0;
  this.destructible = true;
  this.points = 0;
  this.health = Shield.stats.health;
  this.shield = true;
  this.armor = 0;
  VisualGameObject.call(this, g_ResourceManager.shield, x, y, 1);
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

Shield.ShieldList = new Array(
    [58 ,572],[67 ,553],
    [77 ,572],[86 ,553],[77 ,534],
    [96 ,572],[105,553],[96 ,534],
    [114,572],[124,553],[114,534],
    [133,572],[143,553],[133,534],
    [152,572],
    
    [332,572],[341,553],
    [351,572],[360,553],[351,534],
    [370,572],[379,553],[370,534],
    [388,572],[398,553],[388,534],
    [407,572],[417,553],[407,534],
    [426,572],
    
    [581,572],[590,553],
    [600,572],[609,553],[600,534],
    [619,572],[628,553],[619,534],
    [637,572],[647,553],[637,534],
    [656,572],[666,553],[656,534],
    [675,572],
    
    [857,572],[866,553],
    [876,572],[885,553],[876,534],
    [895,572],[904,553],[895,534],
    [913,572],[923,553],[913,534],
    [932,572],[942,553],[932,534],
    [951,572]
  );
