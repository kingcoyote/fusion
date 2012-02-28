function GameObject(x, y, z) {
  this.zOrder = z;
  this.x      = x;
  this.y      = y;
  g_GameObjectManager.addGameObject(this);
  return this;
}

GameObject.prototype.shutdown = function() {
  g_GameObjectManager.removeGameObject(this);
};