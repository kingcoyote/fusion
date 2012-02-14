var FPS = 30,
  SECONDS_BETWEEN_FRAMES = 1 / FPS,
  g_GameObjectManager = null,
  g_ApplicationManager = null,
  g_ResourceManager = null,
  g_score = 0,
  g_level = 0,
  g_lives = 0,
  g_player = null,
  g_store = null,
  g_ship_defaults = {
      health : 20,
      speed  : 275,
      firespeed : 0.50
  },
  g_ship = {};

window.onload = function() {
  new GameObjectManager().startupGameObjectManager();
  document.getElementById('restart').onclick = function() {
    g_GameObjectManager = new GameObjectManager().startupGameObjectManager();
  };
};

