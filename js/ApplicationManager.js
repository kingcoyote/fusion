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

        this.level = new Level().startupLevel(canvasWidth, canvasHeight);
        this.background = new Background().startupBackground(g_ResourceManager.background);
        g_player = new Player().startupPlayer(this.level);
        
        this.invader_controller = new InvaderController().startupInvaderController(1);
        
        this.updateScore();
        return this;
    }

    this.updateScore = function()
    {
        var score = document.getElementById("score");
        score.innerHTML = String(g_score);
    }
}