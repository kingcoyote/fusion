function Player() {
  this.speed        = Player.stats.speed; // base speed. between 50 and 500 is reasonable. 275 is default
  this.left         = false;
  this.right        = false;
  this.fire         = false;
  this.cooldown     = 0;
  this.screenBorder = 20;
  this.firespeed    = Player.stats.firespeed; // weapon cooldown in seconds. 0.5 is default
  this.health       = Player.stats.health;
  this.max_health   = Player.stats.health;
  this.armor = 0;
  this.angle = 0;
  this.rotation_speed = 1;
  
  this.gun = { x : 50, y : 15 };
  
  this.team = -1;
  
  this.invulnerable = 0;
  
  this.destructible = true;
  this.points = 0;
  
  VisualGameObject.call(
      this,
      g_ResourceManager.hammer, 
      g_GameObjectManager.canvas.width / 2 - 50, 
      g_GameObjectManager.canvas.height - 165, 
      5
  );
  this.sprite.initFrames(7,1);
  this.sprite.setFrame(3,0);
  
  this.store_div = document.getElementById('store_player');
  this.store_div.onclick = this.showStore;
  
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
};

Player.prototype.update = function (dt) {
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
    this.cooldown = this.firespeed;
    this.shoot();
  }
  
  this.store_div.style.top = this.y + 'px';
  this.store_div.style.left = this.x + 'px';
  this.store_div.style.width = this.sprite.width + 'px';
  this.store_div.style.height = this.sprite.height + 'px';
};
  
Player.prototype.shoot = function() {
  g_GameObjectManager.addGameObject(new Bullet(this.x + this.gun.x, this.y + this.gun.y, Math.PI, -1));
  g_GameObjectManager.addGameObject(TempGameObject(
    new VisualGameObject(g_ResourceManager.flashUp, this.x + this.gun.x - 27 , this.y + this.gun.y - 54, 5),
    0.05
  ));
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
  
Player.prototype.showStore = function() {
  var inventory = Object.create(self.StoreInventory).__proto__;
  
  if(Player.stats.firespeed <= 0.25) {
    delete inventory.fasterfiring;
  }
  
  if(g_lives >= 5) {
    delete inventory.extralife;
  }
  
  g_store.showInventory(inventory);
};
  
Player.prototype.extraLife = function() {
  g_lives++;
  g_ApplicationManager.updateLives();
};

Player.prototype.increasedHealth = function() {
  Player.stats.health += 20;
  self.health += 20;
  self.max_health += 20;
  g_ApplicationManager.updateHealth();
  self.StoreInventory.increasedhealth.cost += 50;
};
  
Player.prototype.speedBoost = function() {
  Player.stats.speed += 25;
  self.speed += 25;
  self.StoreInventory.speedboost.cost += 50;
};

Player.prototype.fasterFiring = function() {
  Player.stats.firespeed -= 0.05;
  self.firespeed -= 0.05;
  self.StoreInventory.fasterfiring.cost += 50;
};
  
Player.StoreInventory = {
    extralife:       { name: "Extra Life", icon : "extralife", cost: 150, callback: Player.extraLife },
    increasedhealth: { name: "Increased Health", icon : "increasedhealth", cost: 50, callback: Player.increasedHealth },
    speedboost:      { name: "Speed Boost", icon : "speedboost", cost: 50, callback: Player.speedBoost },
    fasterfiring:    { name: "Faster Firing", icon : "fasterfiring", cost: 100, callback: Player.fasterFiring }
 }; 

Player.stats_default = {
    health : 60,
    speed  : 325,
    firespeed : 0.4
};
Player.stats = {};
