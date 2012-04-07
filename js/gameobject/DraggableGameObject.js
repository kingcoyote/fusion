function DraggableGameObject(gameobject, cx, cy, cw, ch) {
  gameobject.mouseDown = function(event) {
    if(gameobject.draggable != true) return false;
    
    var rect = new Rectangle(event.offsetX, event.offsetY, 1, 1);
    if(gameobject.collisionArea().intersects(rect))
    {
      var x = event.offsetX - gameobject.x;
      var y = event.offsetY - gameobject.y;
      
      g_GameObjectManager.overlay.onmousemove = function(event) {
        var new_x = event.offsetX - x;
        var new_y = event.offsetY - y;
        
        if(new_x < cx)    new_x = cx;
        if(new_x + gameobject.sprite.width > cx+cw) new_x = cx+cw - gameobject.sprite.width;
        
        if(new_y < cy)    new_y = cy;
        if(new_y + gameobject.sprite.height > cy+ch) new_y = cy+ch - gameobject.sprite.height;
        
        gameobject.x = new_x;
        gameobject.y = new_y;
      };
    }
  };
  
  gameobject.mouseUp = function(event) {
    g_GameObjectManager.overlay.onmousemove = null;
  };
  
  gameobject.draggable = true;
  
  return gameobject;
}
