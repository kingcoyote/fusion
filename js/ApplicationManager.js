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
		
		this.background0 = new Background().startupBackground(g_ResourceManager.background0, 1024, 2048, 0, 15, 0, -1024, true, -105);
    this.background1 = new Background().startupBackground(g_ResourceManager.background1, 1024, 2048, 0, 30, 0, -1024, true, -95);
		
    g_player = new Player().startupPlayer();
    
		for(var i in ShieldList) {
			new Shield().startupShield(ShieldList[i][0], ShieldList[i][1]);
		}
		g_level = 1;
		new InvaderController().startupInvaderController(g_level);
		this.updateScore();
		this.updateLevel();
		this.updateLives();
		
		return this;
	};


	this.updateScore = function()
	{
		var score = document.getElementById("score");
		score.innerHTML = String(g_score);
	};
	
	this.updateLevel = function()
	{
	  var level = document.getElementById("level");
    level.innerHTML = String(g_level);
	}
	
	this.updateLives = function()
  {
    var lives = document.getElementById("lives");
    lives.innerHTML = String(g_lives);
  }
}
ApplicationManager.prototype = new GameObject();
