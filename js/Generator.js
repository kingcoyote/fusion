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
    self.store_div = document.getElementById('store_generator_' + i);
    self.startupSpriteGameObject(
        image,
        (i * 199) + 64,
        g_GameObjectManager.canvas.height - image.height -5,
        2,
        3,
        1
    );
    self.arm_left = new SpriteGameObject().startupSpriteGameObject(
        g_ResourceManager.genTower,
        self.x + 17,
        self.y - 20,
        1,
        5,
        1
    );
    self.arm_right = new SpriteGameObject().startupSpriteGameObject(
        g_ResourceManager.genTower,
        self.x + 83,
        self.y - 20,
        1,
        5,
        1
    );
    self.arm_right.mirrored = true;
    self.store_div.style.top  = self.y + 'px';
    self.store_div.style.left = self.x + 'px';
    self.store_div.style.width = self.image.width / 3 + 'px';
    self.store_div.style.height = self.image.height + 'px';
    self.store_div.onclick = self.showStore;
    return self;
  };
  
  self.update = function(dt, context, x, y) {
    if(self.health <= 400) {
      self.arm_left.setFrame(1);
      self.arm_right.setFrame(1);
    }
    if(self.health <= 300) { 
      self.arm_left.setFrame(2);
      self.arm_right.setFrame(2);
    }
    if(self.health <= 200) {
      self.setFrame(1);
      self.arm_left.setFrame(3);
      self.arm_right.setFrame(3);
    }
    if(self.health <= 100) {
      self.arm_left.setFrame(4);
      self.arm_right.setFrame(4);
    }
    if(self.health <= 0) {
      self.setFrame(2);
    }
    
    if(this.addons.length) {
      for(var i in this.addons) {
        var turret = this.addons[i];
        turret.cooldown -= dt;
        if(turret.cooldown <= 0) {
          new Bullet().startupBullet(turret.gun.x + 32, turret.gun.y + 5, -1);
          turret.cooldown = 2.5;
          turret.gun.startAnimation(1,6,0.4);
        }
      }
    }
  };
  
  self.shutdownDestructibleGameObject = function() {
    self.setFrame(2);
    self.arm_left.shutdownVisualGameObject();
    self.arm_right.shutdownVisualGameObject();
    if(self.alive) {
      self.alive = false;
      var explosion = new AnimatedGameObject().startupAnimatedGameObject(
          g_ResourceManager.explosion, 
          self.x + (self.image.width / (2*self.frameCount)) - 62,
          self.y + (self.image.height / (2*self.frameCount)) - 62,
          5,
          5,
          10
      );
      setTimeout(function(){ explosion.shutdownAnimatedGameObject();}, 500);
      
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
    turret.mount = new SpriteGameObject().startupSpriteGameObject(
        g_ResourceManager.turret,
        self.x + self.addon_positions[turret.position].x - (g_ResourceManager.turret.width / 14),
        self.y + self.addon_positions[turret.position].y - (g_ResourceManager.turret.height / 4),
        2,
        7,
        2
    );
    turret.mount.setFrame(0);
    turret.gun = new SpriteGameObject().startupSpriteGameObject(
        g_ResourceManager.turret,
        self.x + self.addon_positions[turret.position].x - (g_ResourceManager.turret.width / 14),
        self.y + self.addon_positions[turret.position].y - (g_ResourceManager.turret.height / 4),
        3,
        7,
        2
    );
    turret.gun.setRow(1);
    turret.gun.setFrame(0);
    turret.cooldown = Math.random() * 2.5;
    self.addons.push(turret);
    self.StoreInventory.genweakturret.cost += 100;
  };
  
  self.increaseArmor = function() {
    self.armor += 1;
    self.StoreInventory.genarmor.cost += 50;
  }
  
  self.StoreInventory = {
    gen100health: { name: "+100 Health", icon : "gen100health", cost: 150, callback: self.minorHealth },
    genweakturret: { name: "Weak Turret", icon : "genweakturret", cost: 100, callback: self.weakTurret },
    genarmor: { name: "Increase Armor", icon : "genarmor", cost: 50, callback: self.increaseArmor }
  };
}
Generator.prototype = new SpriteGameObject();
