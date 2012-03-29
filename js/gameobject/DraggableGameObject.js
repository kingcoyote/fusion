function DraggableGameObject(gameobject) {
  gameobject.mouseDown = function(event) {
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
  
  return gameobject;
}
