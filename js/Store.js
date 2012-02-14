function Store() {
  this.div = null;
  
  this.startupStore = function() {
    this.div = document.getElementById('store');  
    document.getElementById('store_close').onclick = this.closeStore;
    
    document.getElementById('store_inventory').innerHTML = '';
    for(var i in this.StoreInventory) {
      this.addStoreInventory(this.StoreInventory[i], i);
    }
    
    return this;
  }
  
  this.addStoreInventory = function(item, i) {
    var new_div = document.createElement('div');
    new_div.setAttribute('id', 'inventory_'+i);
    new_div.setAttribute('class', 'inventory');
    new_div.innerHTML =
        '<div class="name">'+item.name+'</div>' +
        '<div class="icon '+item.icon+'" /></div>' +
        '<div class="cost">'+item.cost+'</div>';
    
    document.getElementById('store_inventory').appendChild(new_div);
    new_div.childNodes[1].onclick = item.callback;
  }
  
  this.extraLife = function() {
    if(g_score >= 80 && g_lives <= 5) {
      g_score -= 80;
      g_ApplicationManager.updateScore();
      g_lives++;
      g_ApplicationManager.updateLives();
    }
  };
  
  this.shieldRestore = function() {
    if(g_score >= 100) {
      g_score -=100;
      g_ApplicationManager.updateScore();
      g_ApplicationManager.startShields();
    }
  };
  
  this.increasedHealth = function() {
    if(g_score >= 150) {
      g_score -= 150;
      g_ApplicationManager.updateScore();
      g_ship.health += 10;
      g_player.shutdownVisualGameObject();
      g_player = new Player().startupPlayer();
      g_ApplicationManager.updateHealth();
    }
  };
  
  this.speedBoost = function() {
    if(g_score >= 150) {
      g_score -= 150;
      g_ApplicationManager.updateScore();
      g_ship.speed += 25;
      g_player.shutdownVisualGameObject();
      g_player = new Player().startupPlayer();
    }
  };
  
  this.fasterFiring = function() {
    if(g_score >= 200 & g_firespeed > 0.2) {
      g_score -= 200;
      g_ApplicationManager.updateScore();
      g_ship.firespeed -= 0.1;
      g_player.shutdownVisualGameObject();
      g_player = new Player().startupPlayer();
    }
  };
  
  this.StoreInventory = [
     /* extra life */     { name: "Extra Life", icon : "extralife", cost: "80", callback: this.extraLife },
     /* shield restore */ { name: "Repair Shields", icon : "repairshields", cost: "100", callback: this.shieldRestore },
     /* more health */    { name: "Increased Health", icon : "increasedhealth", cost: "150", callback: this.increasedHealth },
     /* engine boost */   { name: "Speed Boost", icon : "speedboost", cost: "150", callback: this.speedBoost },
     /* engine boost */   { name: "Faster Firing", icon : "fasterfiring", cost: "200", callback: this.fasterFiring }
   ];
  
  this.showStore = function() {
    this.div.style.display = 'block';
  };
  
  this.closeStore = function() {
    g_store.div.style.display = 'none';
    new InvaderController().startupInvaderController(g_level);
  };
}