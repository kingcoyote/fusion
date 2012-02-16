/**
    The ApplicationManager is used to manage the application itself.
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
 */
function ApplicationManager()
{
	/**
        Initialises this object
        @param canvasWidth      The width of the canvas
        @param canvasHeight     The height of the canvas
        @return                 A reference to the initialised object

	 */
	this.startupApplicationManager = function(canvasWidth, canvasHeight)
	{
		g_ApplicationManager = this;
		
		g_store = new Store().startupStore();
		
		this.background0 = new Background().startupBackground(g_ResourceManager.background0, 1024, 2048, 0, 15, 0, -1024, true, -105);
    this.background1 = new Background().startupBackground(g_ResourceManager.background1, 1024, 2048, 0, 30, 0, -1024, true, -95);
		for(var i in g_ship_defaults) {
		  g_ship[i] = g_ship_defaults[i];
		}
		  
    g_player = new Player().startupPlayer();
		
		this.startShields();
		g_level = 1;
		new InvaderController().startupInvaderController(g_level);
		this.updateScore();
		this.updateLevel();
		this.updateLives();
		this.updateHealth();
		
		return this;
	};

	this.startShields = function() {
	  var length = g_GameObjectManager.gameObjects.length;
	  for(var i = length -1; i >= 0; --i) {
	    var o = g_GameObjectManager.gameObjects[i];
	    if(o.shield == true) {
	      o.shutdownDestructibleGameObject()
	    }
	  }
	  for(var i in ShieldList) {
      new Shield().startupShield(ShieldList[i][0], ShieldList[i][1]);
    }
	};
	
	this.updateScore = function()
	{
		document.getElementById("score").innerHTML = String(g_score);
		document.getElementById('store_score').innerHTML = g_score;
	};
	
	this.updateLevel = function()
	{
	  var level = document.getElementById("level");
    level.innerHTML = String(g_level);
	};
	
	this.updateLives = function()
  {
    var lives = document.getElementById("lives");
    lives.style.width = g_lives * 43 + 'px';
  };
	
	this.updateHealth = function()
	{
	  var health = document.getElementById("current_health");
	  health.style.width = 334 * (g_player.health / g_player.max_health) + 'px';
	  health.setAttribute('class', (g_player.invulnerable > 0 ? 'invulnerable' : null));
	};
}
ApplicationManager.prototype = new GameObject();
