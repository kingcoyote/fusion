function Store() {
  this.store_hud_div = document.getElementById('store_hud');
  this.store_div = document.getElementById('store');
  this.store_inventory = document.getElementById('store_inventory');
  document.getElementById('store_close').onclick = this.closeStore;
  document.getElementById('inventory_close').onclick = this.hideInventory;
  this.store_hud_div.style.display = 'none';
  return this;
};
  
Store.prototype.showInventory = function(inventory) {
  this.store_div.style.display = 'block';
  this.store_inventory.innerHTML = '';
  for(var i in inventory) {
    this.addStoreInventory(inventory[i], i);
  }
};

Store.prototype.hideInventory = function() {
  g_store.store_div.style.display = 'none';
};

Store.prototype.addStoreInventory = function(item, i) {
  var new_div = document.createElement('div');
  new_div.setAttribute('id', 'inventory_'+i);
  new_div.setAttribute('class', 'inventory');
  new_div.innerHTML =
      '<div class="name">'+item.name+'</div>' +
      '<div class="icon '+item.icon+'" /></div>' +
      '<div class="cost">'+item.cost+'</div>';
  
  this.store_inventory.appendChild(new_div);
  
  new_div.childNodes[1].onclick = function(){
    if(g_score >= item.cost) {
      g_score -= item.cost;
      g_ApplicationManager.updateScore();
      item.callback();
    }
  };
};

Store.prototype.showStore = function() {
  this.store_hud_div.style.display = 'block';
};

Store.prototype.closeStore = function() {
  g_store.store_hud_div.style.display = 'none';
  g_GameObjectManager.addGameObject(new InvaderController(g_level));
};