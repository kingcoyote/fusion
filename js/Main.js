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

g_resources = {
  'background0' : 'images/bg0.jpg',
  'background1' : 'images/bg1-alt.png',
  'bulletUp' : 'images/BulletUp.png',
  'bulletDown' : 'images/BulletDown.png',
  'hammer' : 'images/HammerT1.png',
  'invader1' : 'images/Invader1.png',
  'invader2' : 'images/Invader2.png',
  'invader3': 'images/Invader3.png',
  'explosion': 'images/explosion1.png',
  'smallExploRed': 'images/SmallExploRed.png',
  'smallExploBlue': 'images/SmallExploBlue.png',
  'flashUp': 'images/FlashUp.png',
  'flashDown': 'images/FlashDown.png',
  'shield': 'images/shieldChunk.png',
  'storeSpritesheet': 'images/store/spritesheet.png'
};

window.onload = function() {
  new GameObjectManager().startupGameObjectManager();
  document.getElementById('restart').onclick = function() {
    g_GameObjectManager = new GameObjectManager().startupGameObjectManager();
  };
};

