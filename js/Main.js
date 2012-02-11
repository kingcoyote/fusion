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
  g_health = 20
  g_speed = 275,
  g_firespeed = 0.50;

window.onload = function() {
  new GameObjectManager().startupGameObjectManager();
  document.getElementById('restart').onclick = function() {
    g_GameObjectManager = new GameObjectManager().startupGameObjectManager();
  };
};

