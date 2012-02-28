function TempGameObject(gameobject, duration) {
  var update = gameobject.update;
  
  gameobject.update = function(dt) {
    duration -= dt;
    if(duration <= 0) {
      gameobject.shutdownGameObject();
    } else {
      update.call(gameobject, dt);
    }
  }
  
  return gameobject
}
