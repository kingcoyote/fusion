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
  g_ship = {},
  g_countdown = 0;

g_resources = {
  'background0' : 'images/backgrounds/bg0.jpg',
  'background1' : 'images/backgrounds/bg1-alt.png',
  'bulletUp' : 'images/effects/BulletUp.png',
  'bulletDown' : 'images/effects/BulletDown.png',
  'hammer' : 'images/player/HammerFrames.png',
  'invader1' : 'images/enemies/Invader1.png',
  'invader2' : 'images/enemies/Invader2.png',
  'invader3' : 'images/enemies/Invader3.png',
  'invader4' : 'images/enemies/Invader4.png',
  'invader5' : 'images/enemies/Invader5.png',
  'bossWingLeft' : 'images/enemies/BossWingLeft.png',
  'bossBody' : 'images/enemies/BossBody.png',
  'bossWingRight' : 'images/enemies/BossWingRight.png',
  'explosion': 'images/effects/explosion1.png',
  'smallExploRed': 'images/effects/SmallExploRed.png',
  'smallExploBlue': 'images/effects/SmallExploBlue.png',
  'flashUp': 'images/effects/FlashUp.png',
  'flashDown': 'images/effects/FlashDown.png',
  'shield': 'images/objects/shieldChunk.png',
  'storeSpritesheet': 'images/HUD/spritesheet.png',
  'genBase' : 'images/objects/GenBase.png',
  'genTower' : 'images/objects/GenTower.png',
  'turret'   : 'images/objects/BasicTurret.png'
};

window.onload = function() {
  new GameObjectManager().startupGameObjectManager();
  document.getElementById('restart').onclick = function() {
    g_GameObjectManager = new GameObjectManager().startupGameObjectManager();
  };
};

