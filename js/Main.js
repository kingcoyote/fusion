var FPS = 30,
  SECONDS_BETWEEN_FRAMES = 1 / FPS,
  g_GameObjectManager = null,
  g_ApplicationManager = null,
  g_ResourceManager = null,
  g_player;

g_resources = {
  'bullet'    : 'images/bullet.png',
  'ship'      : 'images/ship.png',
  'turret'    : 'images/turret.png',
  'flash'     : 'images/flash.png',
};

window.onload = function() {
  g_GameObjectManager = new GameObjectManager();
};

