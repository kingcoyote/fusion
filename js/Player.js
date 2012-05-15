function Player() {
  this.speed        = Player.stats.speed; // base speed. between 50 and 500 is reasonable. 275 is default
  this.left         = false;
  this.right        = false;
  this.fire         = false;
  this.screenBorder = 20;
  this.cooldown     = 0;
  this.firespeed    = Player.stats.firespeed; // weapon cooldown in seconds. 0.5 is default
  this.health       = Player.stats.health;
  this.max_health   = Player.stats.health;
  this.armor        = Player.stats.armor;
  this.angle = 0;
  this.rotation_speed = 1;
  
  this.weapon_type = Bullet.cannon
  
  this.team = -1;
  
  this.invulnerable = 0;
  
  this.destructible = true;
  this.points = 0;
  
  VisualGameObject.call(
      this,
      g_ResourceManager.hammer, 
      g_GameObjectManager.canvas.width / 2 - 50, 
      g_GameObjectManager.canvas.height - 235, 
      5
  );
  this.sprite.initFrames(7,1);
  this.sprite.setFrame(3,0);
  
  var p = this;
  this.mouseClick = function() { Store.showInventory(p.getStoreInventory, p); };
  
  return this;
};

Player.prototype = new VisualGameObject;
  
Player.prototype.keyDown = function(event) {
  this.left  = event.keyCode == 37 ? true : this.left;
  this.right = event.keyCode == 39 ? true : this.right;
  this.fire  = event.keyCode == 32 ? true : this.fire;
};

Player.prototype.keyUp = function(event) {
  this.left  = event.keyCode == 37 ? false : this.left;
  this.right = event.keyCode == 39 ? false : this.right;
  this.fire  = event.keyCode == 32 ? false : this.fire;
  
  if(event.keyCode == 49 && Player.stats.weapons.cannon.count > 0) {
    this.weapon_type = Bullet.cannon;
  }
  if(event.keyCode == 50 && Player.stats.weapons.missile.count > 0) {
    this.weapon_type = Bullet.missile;
  }
  if(event.keyCode == 51 && Player.stats.weapons.laser.count > 0) {
    this.weapon_type = Bullet.laser;
  }
  if(event.keyCode == 52 && Player.stats.weapons.mg.count > 0) {
    this.weapon_type = Bullet.mg;
  }
};

Player.prototype.update = function (dt) {
  if(this.health <= 0) {
    this.shutdown();
    return null;
  }
  
  if (this.left) {
    this.x -= this.speed * dt;
    this.sprite.setFrame(0);
  }
  if (this.right) {
    this.x += this.speed * dt;
    this.sprite.setFrame(6);
  }
  
  if(this.right && this.left || (!this.right && !this.left)) {
    this.sprite.setFrame(3);
  }
  
  this.invulnerable -= dt;
  if(this.invulnerable < 0 && this.invulnerable + dt > 0) {
    g_ApplicationManager.updateHealth();
  }
  
  if(this.x - 15 <= 0) {
    this.x = 15;
  }
  if(this.x + 115 >= g_GameObjectManager.canvas.width) {
    this.x = g_GameObjectManager.canvas.width - 115;
  }
  
  this.cooldown -= dt;
  if(this.fire && this.cooldown <= 0) {
    this.cooldown = Bullet.types[this.weapon_type].firespeed; 
    this.shoot();
  }
};
  
Player.prototype.shoot = function() {
  for(var i in Player.guns[Player.stats.weapons[this.weapon_type].count]) {
    var gun = Player.guns[Player.stats.weapons[this.weapon_type].count][i];
    var angle    = Math.PI / 2 - Math.atan2(gun.y, gun.x);
    var distance = Math.sqrt(gun.x * gun.x + gun.y * gun.y);
    
    var bullet = new Bullet(
      this.weapon_type,
      (this.x + this.sprite.width / 2) + (Math.sin(this.angle - angle) * distance), 
      (this.y + this.sprite.height / 2) + (Math.cos(this.angle - angle) * distance), 
      this.angle, 
      -1,
      Player.stats.weapons[this.weapon_type].level
    );
    g_GameObjectManager.addGameObject(bullet);
  }
};
  
Player.prototype.shutdown = function() {
  var explosion = new VisualGameObject(
      g_ResourceManager.explosion, 
      this.x + (100 / 2) - 62,
      this.y + (85 / 2) - 62,
      1
  );
  explosion.sprite.initFrames(5);
  explosion.sprite = AnimatedSprite(explosion.sprite, [2,3,4], 0.50, false);
  g_GameObjectManager.addGameObject(explosion);
  g_lives--;
  g_ApplicationManager.updateLives();
  if(g_lives) {
    setTimeout(function(){
      g_player = new Player();
      g_player.invulnerable = 2;
      g_ApplicationManager.updateHealth();
      g_GameObjectManager.addGameObject(g_player);
    }, 3000);
  } else {
    g_ApplicationManager.gameOver('You are out of lives!');
  }
  
  TempGameObject(explosion, 0.5);
  
  VisualGameObject.prototype.shutdown.call(this);
};
  
Player.prototype.getStoreInventory = function() {
  var inventory = Object.create(Player.StoreInventory).__proto__;
  
  if(Player.stats.firespeed <= 0.25) {
    delete inventory.fasterfiring;
  }
  
  if(g_lives >= 5) {
    delete inventory.extralife;
  }
  
  return inventory;
};
  
Player.extraLife = function() {
  g_lives++;
  g_ApplicationManager.updateLives();
};

Player.increasedHealth = function() {
  Player.stats.health += 20;
  g_player.health += 20;
  g_player.max_health += 20;
  g_ApplicationManager.updateHealth();
  Player.StoreInventory.increasedhealth.cost += 50;
};
  
Player.speedBoost = function() {
  Player.stats.speed += 25;
  g_player.speed += 25;
  Player.StoreInventory.speedboost.cost += 50;
};

Player.fasterFiring = function() {
  Player.stats.firespeed -= 0.05;
  g_player.firespeed -= 0.05;
  Player.StoreInventory.fasterfiring.cost += 50;
};

Player.increaseArmor = function() {
  Player.stats.armor++;
  g_player.armor++;
  Player.StoreInventory.increaseArmor.cost += 50;
};

Player.doubleCannon = function() {
  Player.stats.weapons.cannon.count = 2;
  Player.StoreInventory.doubleCannon.active = false;
  Player.StoreInventory.tripleCannon.active = true;
};
Player.tripleCannon = function() {
  Player.stats.weapons.cannon.count = 3;
  Player.StoreInventory.tripleCannon.active = false;
};
Player.cannonBoost = function() {
  Player.stats.weapons.cannon.level++;
  
  if(Player.stats.weapons.cannon.level == 4) {
    Player.StoreInventory.cannonBoost.active = false;
  } else {
    Player.StoreInventory.cannonBoost.cost *= 2;
  }
};
Player.laser = function() {};
Player.doubleLaser = function() {};
Player.tripleLaser = function() {};
Player.laserBoost = function() {};
Player.missile = function() {};
Player.doubleMissile = function() {};
Player.tripleMissile = function() {};
Player.missileBoost = function() {};
Player.mg = function() {
  Player.stats.weapons.mg.count = 1;
  Player.StoreInventory.mg.active = false;
  Player.StoreInventory.mgBoost.active = true;
  Player.StoreInventory.doubleMg.active = true;
};
Player.doubleMg = function() {
  Player.stats.weapons.mg.count = 2;
  Player.StoreInventory.doubleMg.active = false;
  Player.StoreInventory.tripleMg.active = true;
};
Player.tripleMg = function() {
  Player.stats.weapons.mg.count = 3;
  Player.StoreInventory.tripleMg.active = false;
};
Player.mgBoost = function() {
  Player.stats.weapons.mg.level++;
  
  if(Player.stats.weapons.mg.level == 3) {
    Player.StoreInventory.mgBoost.active = false;
  } else {
    Player.StoreInventory.mgBoost.cost *= 2;
  }
};

Player.StoreInventory = {
    extralife:       { name: "Extra Life", icon : "extralife", cost: 150, callback: Player.extraLife },
    increasedhealth: { name: "Increased Health", icon : "increasedhealth", cost: 50, callback: Player.increasedHealth },
    speedboost:      { name: "Speed Boost", icon : "speedboost", cost: 50, callback: Player.speedBoost },
    fasterfiring:    { name: "Faster Firing", icon : "fasterfiring", cost: 100, callback: Player.fasterFiring, active:false },
    increaseArmor:   { name: "Increase Armor", icon: "playerincreasearmor", cost: 100, callback: Player.increaseArmor },
    doubleCannon:    { name: "Double Cannon", icon: "playerdoublecannon", cost: 300, callback: Player.doubleCannon },
    tripleCannon:    { name: "Triple Cannon", icon: "playertriplecannon", cost: 800, callback: Player.tripleCannon, active: false },
    cannonBoost:     { name: "Cannon Boost", icon: "playercannonboost3", cost: 150, callback: Player.cannonBoost },
    laser:           { name: "Laser", icon: "playerlaser", cost: 100, callback: Player.laser, active:false },
    doubleLaser:     { name: "Double Laser", icon: "playerdoublelaser", cost: 300, callback: Player.doubleLaser, active: false },
    tripleLaser:     { name: "Triple Laser", icon: "playertriplelaser", cost: 800, callback: Player.tripleLaser, active: false },
    laserBoost:      { name: "Laser Boost", icon: "playerlaserboost4", cost: 150, callback: Player.laserBoost, active: false },
    missile:         { name: "Missile", icon: "playermissile", cost: 100, callback: Player.missile, active:false },
    doubleMissile:   { name: "Double Missile", icon: "playerdoublemissile", cost: 300, callback: Player.doubleMissile, active: false },
    tripleMissile:   { name: "Triple Missile", icon: "playertriplemissile", cost: 800, callback: Player.tripleMissile, active: false },
    missileBoost:    { name: "Missile Boost", icon: "playermissileboost2", cost: 150, callback: Player.missileBoost, active: false },
    mg:              { name: "MG", icon: "playermg", cost: 100, callback: Player.mg },
    doubleMg:        { name: "Double MG", icon: "playerdoublemg", cost: 300, callback: Player.doubleMg, active: false },
    tripleMg:        { name: "Triple MG", icon: "playertriplemg", cost: 800, callback: Player.tripleMg, active: false },
    mgBoost:         { name: "MG Boost", icon: "playermgboost2", cost: 150, callback: Player.mgBoost, active:false }
 }; 

Player.stats_default = {
    health : 50,
    speed  : 325,
    firespeed : 0.4,
    armor: 1,
    weapons: {
      cannon: {count: 1, level: 1},
      missile: {count: 0, level: 1},
      laser: {count: 0, level: 1},
      mg: {count: 0, level: 1}
    }
};
Player.stats = {};

Player.guns = [
  [],
  [{ x : 0, y : -30 }],
  [{ x : -28, y : -35 },{ x : 28, y : -35 }],
  [{ x : -28, y : -35 },{ x : 0, y : -30 },{ x : 28, y : -35 }]
];
