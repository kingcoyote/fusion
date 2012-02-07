var FPS = 30,
  SECONDS_BETWEEN_FRAMES = 1 / FPS,
  g_GameObjectManager = null,
  g_ApplicationManager = null,
  g_ResourceManager = null,
  g_score = 0,
  g_player = null;

window.onload = function() {
  new GameObjectManager().startupGameObjectManager();
};

