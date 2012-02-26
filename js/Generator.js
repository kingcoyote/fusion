function Generator() {
  var self = this;
  
  self.team = -1;
  self.destructible = true;
  self.health = 500;
  self.alive = true;
  self.points = 0;
  self.addons = [];
  self.addon_positions = [
    {x:-5, y:-45},
    {x:50, y: -55},
    {x:105, y:-45} 
  ];
  self.armor = 1;
  
  self.startupGenerator = function(i) {
    var image = g_ResourceManager.genBase;
    
    self.startupVisualGameObject(
        image,
        (i * 199) + 64,
        g_GameObjectManager.canvas.height - image.height -5,
        2
    );
    self.sprite.initFrames(3);
    
    self.arm_left = new VisualGameObject().startupVisualGameObject(
        g_ResourceManager.genTower,
        self.x + 17,
        self.y - 20,
        1
    );
    self.arm_left.sprite.initFrames(5);
    
    self.arm_right = new VisualGameObject().startupVisualGameObject(
        g_ResourceManager.genTower,
        self.x + 58,
        self.y - 20,
        1
    );
    self.arm_right.sprite.initFrames(5);
    self.arm_right.sprite.reflect(true, false);
    
    self.store_div = document.getElementById('store_generator_' + i);
    self.store_div.style.top  = self.y + 'px';
    self.store_div.style.left = self.x + 'px';
    self.store_div.style.width = self.sprite.width + 'px';
    self.store_div.style.height = self.sprite.height + 'px';
    self.store_div.onclick = self.showStore;
    
    return self;
  };
  
  self.update = function(dt, context, x, y) {
    self.sprite.setFrame(0);
    self.arm_left.sprite.setFrame(0);
    self.arm_right.sprite.setFrame(0);

    if(self.health <= 400) {
      self.arm_left.sprite.setFrame(1);
      self.arm_right.sprite.setFrame(1);
    }
    if(self.health <= 300) { 
      self.arm_left.sprite.setFrame(2);
      self.arm_right.sprite.setFrame(2);
    }
    if(self.health <= 200) {
      self.sprite.setFrame(1);
      self.arm_left.sprite.setFrame(3);
      self.arm_right.sprite.setFrame(3);
    }
    if(self.health <= 100) {
      self.arm_left.sprite.setFrame(4);
      self.arm_right.sprite.setFrame(4);
    }
    if(self.health <= 0) {
      self.sprite.setFrame(2);
    }
    
    if(this.addons.length && self.alive) {
      for(var i in this.addons) {
        var turret = this.addons[i];
        turret.cooldown -= dt;
        if(turret.cooldown <= 0) {
          new Bullet().startupBullet(turret.gun.x + 32, turret.gun.y + 5, -1);
          turret.cooldown = 2.5;
          turret.gun.sprite = AnimatedSprite(turret.gun.sprite, [2,3,4,5,0], 0.4, false);
        }
      }
    }
  };
  
  self.shutdownDestructibleGameObject = function() {
    self.sprite.setFrame(2);
    self.arm_left.sprite.setFrame(6);
    self.arm_right.sprite.setFrame(6);
    if(self.alive) {
      self.alive = false;
      var explosion = new VisualGameObject().startupVisualGameObject(
          g_ResourceManager.explosion, 
          self.x + (self.sprite.width / 2) - 62,
          self.y + (self.sprite.height / 2) - 62,
          5
      );
      explosion.sprite.initFrames(5);
      setTimeout(function(){ explosion.shutdownVisualGameObject();}, 500);
      
      for(var i in g_ApplicationManager.generators) {
        if(g_ApplicationManager.generators[i].alive) {
          return;
        }
      }
      g_ApplicationManager.gameOver('All generators have died!');
    }
  };
  
  self.showStore = function() {
    var inventory = Object.create(self.StoreInventory).__proto__;
    if(self.addons.length >= 3) {
      delete inventory.genweakturret;
    }
    g_store.showInventory(inventory);
  };
  
  self.minorHealth = function() {
    self.health += 100;
    if(self.health >= 500) {
      self.health = 500;
    }
  };
  
  self.weakTurret = function() {
    var turret = {};
    turret.position = self.addons.length;
    turret.mount = new VisualGameObject().startupVisualGameObject(
        g_ResourceManager.turret,
        self.x + self.addon_positions[turret.position].x - (g_ResourceManager.turret.width / 14),
        self.y + self.addon_positions[turret.position].y - (g_ResourceManager.turret.height / 4),
        2
    );
    turret.mount.sprite.initFrames(7,2);
    
    turret.gun = new VisualGameObject().startupVisualGameObject(
        g_ResourceManager.turret,
        self.x + self.addon_positions[turret.position].x - (g_ResourceManager.turret.width / 14),
        self.y + self.addon_positions[turret.position].y - (g_ResourceManager.turret.height / 4),
        3
    );
    turret.gun.sprite.initFrames(7,2);
    turret.gun.sprite.setFrame(0,1);
    
    turret.cooldown = Math.random() * 2.5;
    self.addons.push(turret);
    self.StoreInventory.genweakturret.cost += 100;
  };
  
  self.increaseArmor = function() {
    self.armor += 1;
    self.StoreInventory.genarmor.cost += 50;
  };
  
  self.StoreInventory = {
    gen100health: { name: "+100 Health", icon : "gen100health", cost: 150, callback: self.minorHealth },
    genweakturret: { name: "Weak Turret", icon : "genweakturret", cost: 100, callback: self.weakTurret },
    genarmor: { name: "Increase Armor", icon : "genarmor", cost: 50, callback: self.increaseArmor }
  };
}
Generator.prototype = new VisualGameObject();
