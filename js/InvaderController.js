function InvaderController() {
  this.invaders = [];
  this.row_drop = 0;
  this.speed_increment = 0;
  this.x_speed = 0;
  this.y_drop = 0;
  
  this.startupInvaderController = function(level) {
    this.startupGameObject(15, 15, -1);
    this.level = level;
    if(! InvaderWaves[level]) {
      level = InvaderWaves.length - 1;
    }
    this.speed_increment = InvaderWaves[level].speed_increment;
    this.row_drop = InvaderWaves[level].row_drop;
    this.x_speed = InvaderWaves[level].x_speed;
    for(var i in InvaderWaves[level].invaders) {
      var invader = new Invader();
      invader.startupInvader(
        InvaderWaves[level].invaders[i][0],
        InvaderWaves[level].invaders[i][1],
        InvaderWaves[level].invaders[i][2],
        this
      );
      this.invaders.push(invader);
    }
  };

  this.update = function(dt, context, xScroll, yScroll) {
    alive = false;
    for(var i in this.invaders) {
      if(this.invaders[i].dead) continue;
      if(this.invaders[i].y > g_GameObjectManager.canvas.height + this.invaders[i].type.height - 300) {
        g_GameObjectManager.endLoop();
      }
      alive = true;
      if(this.invaders[i].x + this.invaders[i].type.width + 15 > 1024) {
        this.y_drop += this.row_drop;
        this.x_speed = 0 - (Math.abs(this.x_speed) + this.speed_increment);
      }
      
      if(this.invaders[i].x < 15) {
        this.y_drop += this.row_drop;
        this.x_speed = Math.abs(this.x_speed) + this.speed_increment;
      }
      if(Math.random() > 0.999 && this.invaders[i].cooldown <= 0) {
        this.invaders[i].shoot();
      }
    };
    if(alive === false) {
      var new_level = this.level + 1;
      g_level = new_level;
      g_ApplicationManager.updateLevel();
      setTimeout(function(){
        new InvaderController().startupInvaderController(new_level);
      }, 3000)
      this.shutdownGameObject();
    }
  };
}

InvaderController.prototype = new GameObject;
