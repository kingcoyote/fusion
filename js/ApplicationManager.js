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

		this.invader_controller = new InvaderController().startupInvaderController(1);
		this.updateScore();

		return this;
	};


	this.updateScore = function()
	{
		var score = document.getElementById("score");
		score.innerHTML = String(g_score);
	};
}
ApplicationManager.prototype = new GameObject();
