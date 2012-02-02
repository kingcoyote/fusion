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
        this.background = new VisualGameObject().startupVisualGameObject(g_ResourceManager.background, -300, -750, 1);
        g_player = new Player().startupPlayer(this.level);
        this.updateScore();
        return this;
    }

    this.updateScore = function()
    {
        var score = document.getElementById("score");
        score.innerHTML = String(g_score);
    }
}