function Generator() {
  this.team = -1;
  this.destructible = true;
  this.health = 500;
  this.alive = true;
  this.points = 0;
  
  this.startupGenerator = function(i) {
    var image = g_ResourceManager.genBase;
    this.startupSpriteGameObject(
        image,
        (i * 199) + 64,
        g_GameObjectManager.canvas.height - image.height + 5,
        2,
        3
    );
    this.arm_left = new SpriteGameObject().startupSpriteGameObject(
        g_ResourceManager.genTower,
        this.x + 17,
        this.y - 20,
        1,
        5
    );
    this.arm_right = new SpriteGameObject().startupSpriteGameObject(
        g_ResourceManager.genTower,
        this.x + 83,
        this.y - 20,
        1,
        5
    );
    this.arm_right.mirrored = true;
    return this;
  };
  
  this.update = function(dt, context, x, y) {
    if(this.health <= 400) {
      this.arm_left.setFrame(1);
      this.arm_right.setFrame(1);
    }
    if(this.health <= 300) { 
      this.arm_left.setFrame(2);
      this.arm_right.setFrame(2);
    }
    if(this.health <= 200) {
      this.setFrame(1);
      this.arm_left.setFrame(3);
      this.arm_right.setFrame(3);
    }
    if(this.health <= 100) {
      this.arm_left.setFrame(4);
      this.arm_right.setFrame(4);
    }
    if(this.health <= 0) {
      this.setFrame(2);
    }
  };
  
  this.shutdownDestructibleGameObject = function() {
    this.setFrame(2);
    this.arm_left.shutdownVisualGameObject();
    this.arm_right.shutdownVisualGameObject();
    if(this.alive) {
      this.alive = false;
      var explosion = new AnimatedGameObject().startupAnimatedGameObject(
          g_ResourceManager.explosion, 
          this.x + (this.image.width / (2*this.frameCount)) - 62,
          this.y + (this.image.height / (2*this.frameCount)) - 62,
          5,
          5,
          10
      );
      setTimeout(function(){ explosion.shutdownAnimatedGameObject();}, 500);
      
      for(var i in g_ApplicationManager.generators) {
        if(g_ApplicationManager.generators[i].alive) {
          return;
        }
      }
      g_ApplicationManager.gameOver();
    }
  };
}
Generator.prototype = new SpriteGameObject();
