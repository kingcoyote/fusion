function PlacerGameObject(gameobject) {
  gameobject.mouseDown = function(event) {
    var rect = new Rectangle(event.x, event.y, 1, 1);
    if(true || gameobject.collisionArea().intersects(rect))
    {
      var x = event.x - gameobject.x;
      var y = event.y - gameobject.y;
      
      document.onmousemove = function(event) {
        gameobject.x = event.x - x;
        gameobject.y = event.y - y;
      };
    }
  };
  
  gameobject.mouseUp = function(event) {
    document.onmousemove = null;
  };
  
  return gameobject;
}
