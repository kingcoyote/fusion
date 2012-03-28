function ApplicationManager(canvasWidth, canvasHeight) {
  g_ApplicationManager = this;

  g_store = new Store();

  g_GameObjectManager.addGameObject(new Background(g_ResourceManager.background0, 1024, 2048, 0, 15, 0, -1024, true, -105));
  g_GameObjectManager.addGameObject(new Background(g_ResourceManager.background1, 1024, 2048, 0, 30, 0, -1024, true, -95));
  g_GameObjectManager.addGameObject(new VisualGameObject(g_ResourceManager.platform, 0, 651, -1));
  g_GameObjectManager.addGameObject(new VisualGameObject(g_ResourceManager.platformex, 20, 598, -2));
  Player.stats = {};
  for(var i in Player.stats_default) {
    Player.stats[i] = Player.stats_default[i];
  }

  g_player = new Player();
  g_GameObjectManager.addGameObject(g_player);

  this.generators = [];
  this.startGenerators();
  g_level = 1;
  var turretplacer = PlacerGameObject(new Turret(500,500));
  g_GameObjectManager.addGameObject(turretplacer);
  //this.invaderController = new InvaderController(g_level);
  //g_GameObjectManager.addGameObject(this.invaderController);
  this.updateScore();
  this.updateLevel();
  this.updateLives();
  this.updateHealth();

  return this;
};

ApplicationManager.prototype.startGenerators = function() {
  this.generators.push(new Generator(0));
  this.generators.push(new Generator(1));
  this.generators.push(new Generator(2));
  
  g_GameObjectManager.addGameObject(this.generators[0]);
  g_GameObjectManager.addGameObject(this.generators[1]);
  g_GameObjectManager.addGameObject(this.generators[2]);
};

ApplicationManager.prototype.startShields = function() {
  var length = g_GameObjectManager.gameObjects.length;
  for(var i = length -1; i >= 0; --i) {
    var o = g_GameObjectManager.gameObjects[i];
    if(o.shield == true) {
      o.shutdown();
    }
  }
  for(var i in Shield.ShieldList) {
    g_GameObjectManager.addGameObject(new Shield(Shield.ShieldList[i][0], Shield.ShieldList[i][1]));
  }
};

ApplicationManager.prototype.updateScore = function()
{
  document.getElementById("score").innerHTML = String(g_score);
  document.getElementById('store_score').innerHTML = g_score;
};

ApplicationManager.prototype.updateLevel = function()
{
  var level = document.getElementById("level");
  level.innerHTML = String(g_level);
};

ApplicationManager.prototype.updateLives = function()
{
  var lives = document.getElementById("lives");
  lives.style.width = g_lives * 43 + 'px';
};

ApplicationManager.prototype.updateHealth = function()
{
  var health = document.getElementById("current_health");
  health.style.width = 334 * (g_player.health / g_player.max_health) + 'px';
  health.setAttribute('class', (g_player.invulnerable > 0 ? 'invulnerable' : null));
};

ApplicationManager.prototype.gameOver = function(message)
{
  document.getElementById('game_over_message').innerHTML = message;
  setTimeout(function(){
    g_GameObjectManager.endLoop();
    document.getElementById('game_over').style.display='block';
  }, 1000);
};

ApplicationManager.prototype.updateCountdown = function() {
  var countdown = document.getElementById('countdown');
  countdown.innerHTML = Math.ceil(g_countdown);
  if(g_countdown >= 0) {
    countdown.style.display = 'block';
  } else {
    countdown.style.display = 'none';
  }
};
