function Store() {
  Store.store_hud_div = document.getElementById('store_hud');
  Store.button = document.getElementById('store_close');
  Store.store_div = document.getElementById('store');
  Store.store_inventory = document.getElementById('store_inventory');
  document.getElementById('store_close').onclick = Store.closeStore;
  document.getElementById('inventory_close').onclick = Store.hideInventory;
  Store.store_hud_div.style.display = 'none';
};
  
Store.showInventory = function(inventoryCallback, scope) {
  Store.store_div.style.display = 'block';
  Store.store_inventory.innerHTML = '';
  var inventory = inventoryCallback.call(scope);
  for(var i in inventory) {
    Store.addStoreInventory(inventory[i], i, scope);
  }
};

Store.hideInventory = function() {
  Store.store_div.style.display = 'none';
};

Store.addStoreInventory = function(item, i, scope) {
  var new_div = document.createElement('div');
  new_div.setAttribute('id', 'inventory_'+i);
  new_div.setAttribute('class', 'inventory');
  new_div.innerHTML =
      '<div class="name">'+item.name+'</div>' +
      '<div class="icon '+item.icon+'" /></div>' +
      '<div class="cost">'+item.cost+'</div>';
  
  Store.store_inventory.appendChild(new_div);
  
  new_div.childNodes[1].onclick = function(){
    if(g_score >= item.cost) {
      g_score -= item.cost;
      g_ApplicationManager.updateScore();
      item.callback.apply(scope);
    }
  };
};

Store.showStore = function() {
  Store.store_hud_div.style.display = 'block';
  Store.button.style.display = 'block';
};

Store.closeStore = function() {
  Store.store_hud_div.style.display = 'none';
  Store.button.style.display = 'none';
  for(var i in g_GameObjectManager.gameObjects) {
    if(typeof(g_GameObjectManager.gameObjects[i].draggable == 'boolean')) {
      g_GameObjectManager.gameObjects[i].draggable = false;
    }
  }
  g_ApplicationManager.invaderController = new InvaderController(g_level);
  g_GameObjectManager.addGameObject(g_ApplicationManager.invaderController);
};