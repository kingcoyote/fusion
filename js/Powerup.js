/**
    Represents a powerup in the game
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
 */
function Powerup()
{
  /** The value of the powerup
        @type Number
   */
  this.value = 0;
  /** The current position on the sine wave
        @type Number
   */
  this.sineWavePos = 0;
  /** How quickly the powerup cycles through the sine wave
        @type Number
   */
  this.bounceTime = 1;
  /** The speed to increment the sineWavePos value at
        @type Number
   */
  this.bounceSpeed = Math.PI / this.bounceTime;
  /** The height of the powerups bounce
        @type Number
   */
  this.bounceHeight = 10;

  /**
        Initialises this object
        @param number       The value (score) of this powerup
        @param image        The image to be displayed
        @param number       The position on the X axis
        @param number       The position on the Y axis
        @param number       The depth
        @param number       The number of animation frames in the image
        @param number       The frames per second to animate this object at
   */
  this.startupPowerup = function(value, image, x, y, z, frameCount, fps)
  {
    this.startupAnimatedGameObject(image, x, y - this.bounceHeight, z, frameCount, fps);
    this.value = value;
    return this;
  };

  /**
        Shuts this object down.
   */
  this.shutdownPowerup = function()
  {
    this.shutdownAnimatedGameObject();
  };

  /**
        Updates the object
        @param number  The time since the last frame in seconds
        @param context The drawing context
        @param number  The global scrolling value of the x axis
        @param number  The global scrolling value of the y axis
   */
  this.update = function (dt, context, xScroll, yScroll)
  {
    var lastSineWavePos = this.sineWavePos;
    this.sineWavePos += this.bounceSpeed * dt;
    this.y += (Math.sin(this.sineWavePos) - Math.sin(lastSineWavePos)) * this.bounceHeight;

    if (this.collisionArea().intersects(g_player.collisionArea()))
    {
      this.shutdownPowerup();
      g_score += this.value;
      g_ApplicationManager.updateScore();
    }
  };
}

Powerup.prototype = new AnimatedGameObject;
