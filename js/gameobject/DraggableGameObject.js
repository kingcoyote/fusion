function DraggableGameObject(gameobject) {
  gameobject.mouseDown = function(event) {
    if(gameobject.draggable != true) return false;
    
    var rect = new Rectangle(event.offsetX, event.offsetY, 1, 1);
    if(gameobject.collisionArea().intersects(rect))
    {
      var x = event.offsetX - gameobject.x;
      var y = event.offsetY - gameobject.y;
      
      document.onmousemove = function(event) {
        gameobject.x = event.offsetX - x;
        gameobject.y = event.offsetY - y;
      };
    }
  };
  
  gameobject.mouseUp = function(event) {
    document.onmousemove = null;
  };
  
  gameobject.draggable = true;
  
  return gameobject;
}
