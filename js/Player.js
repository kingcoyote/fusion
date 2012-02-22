/**
    A class to represent the player on the screen
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
 */
function Player() {
  var self = this;
  this.speed        = Player.stats.speed; // base speed. between 50 and 500 is reasonable. 275 is default
  this.left         = false;
  this.right        = false;
  this.fire         = false;
  this.cooldown     = 0;
  this.screenBorder = 20;
  this.firespeed   = Player.stats.firespeed; // weapon cooldown in seconds. 0.5 is default
  this.health       = Player.stats.health;
  this.max_health   = Player.stats.health;
  this.armor = 0;
  
  this.gun = { x : 50, y : 15 };
  
  this.team = -1;
  
  this.invulnerable = 0;
  
  this.destructible = true;
  this.points = 0;
  /**
   * construct the player object
   * 
   * @param level
   * @return
   */
  this.startupPlayer = function() {
    this.startupSpriteGameObject(
        g_ResourceManager.hammer, 
        g_GameObjectManager.canvas.width / 2 - 50, 
        g_GameObjectManager.canvas.height - 165, 
        5,
        7,
        1
    );
    this.store_div = document.getElementById('store_player');
    this.store_div.onclick = this.showStore;
    this.setFrame(3);
    return this;
  };

  this.keyDown = function(event) {
    this.left  = event.keyCode == 37 ? true : this.left;
    this.right = event.keyCode == 39 ? true : this.right;
    this.fire  = event.keyCode == 32 ? true : this.fire;
  };

  this.keyUp = function(event)
  {
    this.left  = event.keyCode == 37 ? false : this.left;
    this.right = event.keyCode == 39 ? false : this.right;
    this.fire  = event.keyCode == 32 ? false : this.fire;
  };

  /**
    Updates the object
    @param number  The time since the last frame in seconds
    @param context The drawing context
    @param number  The global scrolling value of the x axis
    @param number  The global scrolling value of the y axis
   */
  this.update = function (dt, context, xScroll, yScroll) {
    if (this.left) {
      this.x -= this.speed * dt;
      this.setFrame(0);
    }
    if (this.right) {
      this.x += this.speed * dt;
      this.setFrame(6);
    }
    
    if(this.right && this.left || (!this.right && !this.left)) {
      this.setFrame(3);
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
    this.store_div.style.width = this.image.width / 7 + 'px';
    this.store_div.style.height = this.image.height + 'px';
  };
  
  this.shoot = function() {
    new Bullet().startupBullet(this.x + this.gun.x, this.y + this.gun.y, -1);
    new TempVisualGameObject().startupTempVisualGameObject(g_ResourceManager.flashUp, this.x + this.gun.x - 27 , this.y + this.gun.y - 54, 5, 0.05);
  };
  
  this.shutdownDestructibleGameObject = function() {
    var explosion = new AnimatedGameObject().startupAnimatedGameObject(
        g_ResourceManager.explosion, 
        this.x + (100 / 2) - 62,
        this.y + (85 / 2) - 62,
        1,
        5,
        10
    );
    
    g_lives--;
    g_ApplicationManager.updateLives();
    if(g_lives) {
      setTimeout(function(){
        g_player = new Player().startupPlayer();
        g_player.invulnerable = 2;
        g_ApplicationManager.updateHealth();
      }, 3000);
    } else {
      g_ApplicationManager.gameOver();
    }
    
    this.shutdownVisualGameObject();
    setTimeout(function(){ explosion.shutdownAnimatedGameObject();}, 500);
  };
  
  this.showStore = function() {
    var inventory = Object.create(self.StoreInventory).__proto__;
    
    if(Player.stats.firespeed <= 0.3) {
      delete inventory.fasterfiring;
    }
    
    if(g_lives >= 5) {
      delete inventory.extralife;
    }
    
    g_store.showInventory(inventory);
  };
  
  this.extraLife = function() {
    g_lives++;
    g_ApplicationManager.updateLives();
  };
  
  this.increasedHealth = function() {
    Player.stats.health += 10;
    self.health += 10;
    self.max_health += 10;
    g_ApplicationManager.updateHealth();
    self.StoreInventory.increasedhealth.cost += 50;
  };
  
  this.speedBoost = function() {
    Player.stats.speed += 25;
    self.speed += 25;
    self.StoreInventory.speedboost.cost += 50;
  };
  
  this.fasterFiring = function() {
    Player.stats.firespeed -= 0.05;
    self.firespeed -= 0.05;
    self.StoreInventory.fasterfiring.cost += 50;
  };
  
  self.StoreInventory = {
      extralife:       { name: "Extra Life", icon : "extralife", cost: 80, callback: self.extraLife },
      increasedhealth: { name: "Increased Health", icon : "increasedhealth", cost: 50, callback: self.increasedHealth },
      speedboost:      { name: "Speed Boost", icon : "speedboost", cost: 50, callback: self.speedBoost },
      fasterfiring:    { name: "Faster Firing", icon : "fasterfiring", cost: 100, callback: self.fasterFiring }
   }; 
}
Player.prototype = new SpriteGameObject;
Player.stats_default = {
    health : 20,
    speed  : 275,
    firespeed : 0.50
};
Player.stats = {};
