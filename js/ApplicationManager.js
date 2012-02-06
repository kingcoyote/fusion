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

        //this.background = new Background().startupBackground(g_ResourceManager.background);
		this.background0 = new RepeatingGameObject().startupRepeatingGameObject(g_ResourceManager.background0, 0, 0, 0, 1024, 2048, 0.5);
		this.background1 = new RepeatingGameObject().startupRepeatingGameObject(g_ResourceManager.background1, 0, -1024, 1, 1024, 2048, 0.75);
        g_player = new Player().startupPlayer();
        
        this.invaders = [];
        this.invaders.push(new Invader().startupInvader(1, 15, 183));
        this.invaders.push(new Invader().startupInvader(1, 65, 183));
        this.invaders.push(new Invader().startupInvader(1, 115, 183));
        this.invaders.push(new Invader().startupInvader(1, 165, 183));
        this.invaders.push(new Invader().startupInvader(1, 215, 183));
        this.invaders.push(new Invader().startupInvader(1, 265, 183));
        this.invaders.push(new Invader().startupInvader(1, 315, 183));
        this.invaders.push(new Invader().startupInvader(1, 365, 183));
        
        this.invaders.push(new Invader().startupInvader(2, 15, 119));
        this.invaders.push(new Invader().startupInvader(2, 80, 119));
        this.invaders.push(new Invader().startupInvader(2, 145, 119));
        this.invaders.push(new Invader().startupInvader(2, 220, 119));
        this.invaders.push(new Invader().startupInvader(2, 285, 119));
        this.invaders.push(new Invader().startupInvader(2, 350, 119));
        
        this.invaders.push(new Invader().startupInvader(3, 15, 15));
        this.invaders.push(new Invader().startupInvader(3, 84, 15));
        this.invaders.push(new Invader().startupInvader(3, 153, 15));
        this.invaders.push(new Invader().startupInvader(3, 222, 15));
        this.invaders.push(new Invader().startupInvader(3, 291, 15));
        this.invaders.push(new Invader().startupInvader(3, 360, 15));
		
        this.updateScore();
        return this;
    }
	 
	this.update = function(dt,  context, xScroll, yScroll)
    {
        g_GameObjectManager.yScroll += 50 * dt;
    }

    this.updateScore = function()
    {
        var score = document.getElementById("score");
        score.innerHTML = String(g_score);
    }
}
ApplicationManager.prototype = new GameObject