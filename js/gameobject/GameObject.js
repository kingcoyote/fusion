function GameObject(x, y, z) {
  this.zOrder = z;
  this.x      = x;
  this.y      = y;
  return this;
}

GameObject.prototype.shutdown = function() {
  g_GameObjectManager.removeGameObject(this);
};