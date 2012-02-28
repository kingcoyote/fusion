function Generator(i) {
  this.team = -1;
  this.destructible = true;
  this.health = 500;
  this.alive = true;
  this.points = 0;
  this.addons = [];
  this.addon_positions = 
    [
     {x:-5, y:-45},
     {x:50, y: -55},
     {x:105, y:-45} 
     ];
  this.armor = 1;

  var image = g_ResourceManager.genBase;

  VisualGameObject.call(
      this,
      image,
      (i * 199) + 64,
      g_GameObjectManager.canvas.height - image.height -5,
      2
  );
  this.sprite.initFrames(3);

  this.arm_left = new VisualGameObject(
      g_ResourceManager.genTower,
      this.x + 17,
      this.y - 20,
      1
  );
  this.arm_left.sprite.initFrames(5);

  this.arm_right = new VisualGameObject(
      g_ResourceManager.genTower,
      this.x + 58,
      this.y - 20,
      1
  );
  this.arm_right.sprite.initFrames(5);
  this.arm_right.sprite.reflect(true, false);
  
  g_GameObjectManager.addGameObject(this.arm_left);
  g_GameObjectManager.addGameObject(this.arm_right);
  
  this.store_div = document.getElementById('store_generator_' + i);
  this.store_div.style.top  = this.y + 'px';
  this.store_div.style.left = this.x + 'px';
  this.store_div.style.width = this.sprite.width + 'px';
  this.store_div.style.height = this.sprite.height + 'px';
  this.store_div.onclick = this.showStore;

  return this;
};

Generator.prototype = new VisualGameObject;

Generator.prototype.update = function(dt) {
  this.sprite.setFrame(0);
  this.arm_left.sprite.setFrame(0);
  this.arm_right.sprite.setFrame(0);

  if(this.health <= 400) {
    this.arm_left.sprite.setFrame(1);
    this.arm_right.sprite.setFrame(1);
  }
  if(this.health <= 300) { 
    this.arm_left.sprite.setFrame(2);
    this.arm_right.sprite.setFrame(2);
  }
  if(this.health <= 200) {
    this.sprite.setFrame(1);
    this.arm_left.sprite.setFrame(3);
    this.arm_right.sprite.setFrame(3);
  }
  if(this.health <= 100) {
    this.arm_left.sprite.setFrame(4);
    this.arm_right.sprite.setFrame(4);
  }
  if(this.health <= 0) {
    this.sprite.setFrame(2);
  }

  if(this.addons.length && this.alive) {
    for(var i in this.addons) {
      var turret = this.addons[i];
      turret.cooldown -= dt;
      if(turret.cooldown <= 0) {
        g_GameObjectManager.addGameObject(new Bullet(turret.gun.x + 32, turret.gun.y + 5, -1));
        turret.cooldown = 2.5;
        turret.gun.sprite = AnimatedSprite(turret.gun.sprite, [2,3,4,5,0], 0.4, false);
      }
    }
  }
};

Generator.prototype.shutdown = function() {
  this.sprite.setFrame(2);
  this.arm_left.sprite.setFrame(6);
  this.arm_right.sprite.setFrame(6);
  if(this.alive) {
    this.alive = false;
    var explosion = new VisualGameObject(
        g_ResourceManager.explosion, 
        this.x + (this.sprite.width / 2) - 62,
        this.y + (this.sprite.height / 2) - 62,
        5
    );
    explosion.sprite.initFrames(5);
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

Generator.prototype.showStore = function() {
  var inventory = Object.create(this.StoreInventory).__proto__;
  if(this.addons.length >= 3) {
    delete inventory.genweakturret;
  }
  g_store.showInventory(inventory);
};

Generator.prototype.minorHealth = function() {
  this.health += 100;
  if(this.health >= 500) {
    this.health = 500;
  }
};

Generator.prototype.weakTurret = function() {
  var turret = {};
  turret.position = this.addons.length;
  turret.mount = new VisualGameObject(
      g_ResourceManager.turret,
      this.x + this.addon_positions[turret.position].x - (g_ResourceManager.turret.width / 14),
      this.y + this.addon_positions[turret.position].y - (g_ResourceManager.turret.height / 4),
      2
  );
  turret.mount.sprite.initFrames(7,2);
  
  g_GameObjectManager.addGameObject(turret.mount);
  
  turret.gun = new VisualGameObject(
      g_ResourceManager.turret,
      this.x + this.addon_positions[turret.position].x - (g_ResourceManager.turret.width / 14),
      this.y + this.addon_positions[turret.position].y - (g_ResourceManager.turret.height / 4),
      3
  );
  turret.gun.sprite.initFrames(7,2);
  turret.gun.sprite.setFrame(0,1);

  g_GameObjectManager.addGameObject(turret.gun);
  
  turret.cooldown = Math.random() * 2.5;
  this.addons.push(turret);
  this.StoreInventory.genweakturret.cost += 100;
};

Generator.prototype.increaseArmor = function() {
  this.armor += 1;
  this.StoreInventory.genarmor.cost += 50;
};

Generator.prototype.StoreInventory = {
    gen100health: { name: "+100 Health", icon : "gen100health", cost: 150, callback: this.minorHealth },
    genweakturret: { name: "Weak Turret", icon : "genweakturret", cost: 100, callback: this.weakTurret },
    genarmor: { name: "Increase Armor", icon : "genarmor", cost: 50, callback: this.increaseArmor }
};
