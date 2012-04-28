function Generator(i) {
  if(typeof i == 'undefined') return;
  var g = this;
  this.team = -1;
  this.destructible = true;
  this.health = 500;
  this.alive = true;
  this.points = 0;
  this.addons = [];
  this.addon_position = {x:88, y: -75};
  this.armor = 1;
  this.positions = [
    {x : 87, y : 666 },
    {x : 423, y : 666 },
    {x : 759, y : 666 },
  ];
  
  var image = g_ResourceManager.genBase;

  VisualGameObject.call(
      this,
      image,
      this.positions[i].x,
      this.positions[i].y,
      2
  );
  this.sprite.initFrames(2,3);
  
  this.StoreInventory = {
      genweakturret: { name: "Cannon Turret", icon : "genweakturret", cost: 100, callback: this.weakTurret },
      genmissileturret: { name: "Missile Turret", icon : "genmissileturret", cost:100, callback: this.missileTurret },
      genlaserturret: { name: "Laser Turret", icon : "genlaserturret", cost:100, callback: this.laserTurret },
      genmachinegunturret: { name: "MG Turret", icon : "genmachinegunturret", cost:100, callback: this.machinegunTurret },
      gen100health: { name: "+100 Health", icon : "gen100health", cost: 150, callback: this.minorHealth },
      genarmor: { name: "Increase Armor", icon : "genarmor", cost: 50, callback: this.increaseArmor }
  };
  
  this.mouseClick = function() { Store.showInventory(g.getStoreInventory, g); };
  
  return this;
};

Generator.prototype = new VisualGameObject;

Generator.prototype.draw = function(context) {
  this.sprite.draw(context, Math.ceil(this.x), Math.ceil(this.y));
  if(this.health > 0) {
    context.fillStyle = "green";
    context.fillRect(this.x + 31, this.y + 91, 113 * (this.health / 500), 6);
  }
};

Generator.prototype.update = function(dt) {
  if(this.health <= 0) {
    this.shutdown();
  }
};

Generator.prototype.shutdown = function() {
  this.sprite.setFrame(1);
  if(this.alive) {
    this.alive = false;
    var explosion = new VisualGameObject(
        g_ResourceManager.explosion, 
        this.x + (this.sprite.width / 2) - 62,
        this.y + (this.sprite.height / 2) - 62,
        5
    );
    explosion.sprite.initFrames(5);
    explosion.sprite = AnimatedSprite(explosion.sprite, [1,2,3,4], 0.5);
    g_GameObjectManager.addGameObject(explosion);
    TempGameObject(explosion, 0.5);

    for(var i in g_ApplicationManager.generators) {
      if(g_ApplicationManager.generators[i].alive) {
        return;
      }
    }
    g_ApplicationManager.gameOver('All generators have died!');
  }
};

Generator.prototype.getStoreInventory = function() {
  var inventory = Object.create(this.StoreInventory).__proto__;
  return inventory;
};

Generator.prototype.minorHealth = function() {
  this.health += 100;
  if(this.health >= 500) {
    this.health = 500;
  }
};

Generator.prototype.weakTurret = function() {
  var position = this.addon_position;
  // hide the store div
  // create a new turret placer object
  turret = DraggableGameObject(
    new Turret(
      Turret.gun,
      this.x + position.x,
      this.y + position.y
    ), 
    g_platform.x, 
    g_platform.y, 
    g_platform.sprite.width, 
    g_GameObjectManager.canvas.height - g_platform.y - g_ResourceManager.platform.height
  );
  g_GameObjectManager.addGameObject(turret);
  g_ApplicationManager.turrets.push(turret);
  this.addons.push(turret);
  this.StoreInventory.genweakturret.cost += 100;
};

Generator.prototype.missileTurret = function() {
  var position = this.addon_position;
  // hide the store div
  // create a new turret placer object
  turret = DraggableGameObject(
    new Turret(
      Turret.missile,
      this.x + position.x,
      this.y + position.y
    ), 
    g_platform.x, 
    g_platform.y, 
    g_platform.sprite.width, 
    g_GameObjectManager.canvas.height - g_platform.y - g_ResourceManager.platform.height
  );
  g_GameObjectManager.addGameObject(turret);
  g_ApplicationManager.turrets.push(turret);
  this.addons.push(turret);
  this.StoreInventory.genmissileturret.cost += 100;
};

Generator.prototype.laserTurret = function() {
  var position = this.addon_position;
  // hide the store div
  // create a new turret placer object
  turret = DraggableGameObject(
    new Turret(
      Turret.laser,
      this.x + position.x,
      this.y + position.y
    ), 
    g_platform.x, 
    g_platform.y, 
    g_platform.sprite.width, 
    g_GameObjectManager.canvas.height - g_platform.y - g_ResourceManager.platform.height
  );
  g_GameObjectManager.addGameObject(turret);
  g_ApplicationManager.turrets.push(turret);
  this.addons.push(turret);
  this.StoreInventory.genlaserturret.cost += 100;
};

Generator.prototype.machinegunTurret = function() {
  var position = this.addon_position;
  // hide the store div
  // create a new turret placer object
  turret = DraggableGameObject(
    new Turret(
      Turret.machinegun,
      this.x + position.x,
      this.y + position.y
    ), 
    g_platform.x, 
    g_platform.y, 
    g_platform.sprite.width, 
    g_GameObjectManager.canvas.height - g_platform.y - g_ResourceManager.platform.height
  );
  g_GameObjectManager.addGameObject(turret);
  g_ApplicationManager.turrets.push(turret);
  this.addons.push(turret);
  this.StoreInventory.genmachineturret.cost += 100;
};

Generator.prototype.increaseArmor = function() {
  this.armor += 1;
  this.StoreInventory.genarmor.cost += 50;
};
