var FPS = 30,
  SECONDS_BETWEEN_FRAMES = 1 / FPS,
  g_GameObjectManager = null,
  g_ApplicationManager = null,
  g_ResourceManager = null,
  g_score = 0,
  g_level = 0,
  g_lives = 0,
  g_player = null,
  g_countdown = 0;

g_resources = {
  'background0' : 'images/backgrounds/bg0.jpg',
  'background1' : 'images/backgrounds/bg1-alt.png',
  'planet1' : 'images/backgrounds/planet1.png',
  'bigBullet' : 'images/effects/bigBullet.png',
  'smallBullet' : 'images/effects/smallBullet.png',
  'laser' : 'images/effects/Laser.png',
  'missile' : 'images/effects/Missile.png',
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
  'missileExplosion' : 'images/effects/missileExplosion.png',
  'smallExploRed': 'images/effects/SmallExploRed.png',
  'smallExploBlue': 'images/effects/SmallExploBlue.png',
  'flashUp': 'images/effects/FlashUp.png',
  'flashDown': 'images/effects/FlashDown.png',
  'shield': 'images/objects/shieldChunk.png',
  'storeSpritesheet': 'images/HUD/spritesheet.png',
  'genBase' : 'images/objects/Gen.png',
  'turret'   : 'images/objects/BasicTurret.png',
  'platform' : 'images/objects/platform.png',
  'platformex' : 'images/objects/PlatformExpansion.png',
  'platformex2' : 'images/objects/PlatformExpansion2.png'
};

window.onload = function() {
  precalc_cos = {},
    precalc_sin = {},
    precalc_atan2 = {};

  for(var i = 0; i < 360; i++) {
    precalc_cos[i] = Math.cos(i * (Math.PI / 180));
    precalc_sin[i] = Math.sin(i * (Math.PI / 180));
  }
  
  var n = 100;

  for(var j = 1; j < n; j++) {
    var key1 = String((Math.round(((j / 2) / n) * n)) / n);
    while(key1.length < 4) key1 += "0";
  
    if(key1.length > 5) key1 = String(Math.round(Number(key1) * 1000) / 1000)
    
    var key2 = String(1 - (Math.round(((j / 2) / n) * n)) / n);
    while(key2.length < 4) key2 += "0";

    if(key2.length > 5) key2 = String(Math.round(Number(key2) * 1000) / 1000)

    precalc_atan2[key1] = Math.atan2(n, j);
    precalc_atan2[key2] = Math.atan2(j, n);
  }

  Math.sin = function(angle) {
    var degrees = angle * 180 / Math.PI;
    if(degrees < 0) {
      degrees = 360 + degrees;
    }
    degrees = Math.round(degrees) % 360;
    return precalc_cos[degrees];
  }

  Math.cos = function(angle) {
    var degrees = angle * 180 / Math.PI;
    if(degrees < 0) {
      degrees = 360 + degrees;
    }
    degrees = Math.round(degrees) % 360;
    return precalc_sin[degrees];
  }

  g_GameObjectManager = new GameObjectManager();
  document.getElementById('restart').onclick = function() {
    g_GameObjectManager = new GameObjectManager();
  };
};

