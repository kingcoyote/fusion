function DraggableGameObject(gameobject) {
  gameobject.mouseDown = function(event) {
    if(gameobject.draggable != true) return false;
    
    var rect = new Rectangle(event.offsetX, event.offsetY, 1, 1);
    if(gameobject.collisionArea().intersects(rect))
    {
      var x = event.offsetX - gameobject.x;
      var y = event.offsetY - gameobject.y;
      
      g_GameObjectManager.overlay.onmousemove = function(event) {
        gameobject.x = event.offsetX - x;
        gameobject.y = event.offsetY - y;
      };
    }
  };
  
  gameobject.mouseUp = function(event) {
    g_GameObjectManager.overlay.onmousemove = null;
  };
  
  gameobject.draggable = true;
  
  return gameobject;
}
