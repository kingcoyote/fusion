function GameObjectManager() {
  var g = this;
  this.gameObjects         = new Array();
  this.lastFrame           = +new Date();
  this.canvas              = null;
  this.context2D           = null;
  this.backBuffer          = null;
  this.backBufferContext2D = null;
  this.canvasSupported     = false;
  this.resourcesLoaded     = false;
  this.overlay             = document.getElementById('overlay');
  g_score = 0;
  g_lives = 3;
  g_level = 1;

  document.getElementById('game_over').style.display='none';

  document.onkeydown   = function(e) { g.keyDown(e); };
  document.onkeyup     = function(e) { g.keyUp(e); };
  
  // get references to the canvas elements and their 2D contexts
  this.canvas = document.getElementById('canvas');
  
  this.overlay.onmousedown  = function(e) { g.mouseDown(e); }; 
  this.overlay.onmouseup    = function(e) { g.mouseUp(e); };
  this.overlay.onclick      = function(e) { g.mouseClick(e); }; 
  
  this.context2D = this.canvas.getContext('2d');
  this.backBuffer = document.createElement('canvas');
  this.backBuffer.width = this.canvas.width;
  this.backBuffer.height = this.canvas.height;
  this.backBufferContext2D = this.backBuffer.getContext('2d');

  // create a new ResourceManager
  g_ResourceManager = new ResourceManager(g_resources);

  // use setInterval to call the draw function
  this.loop = setTimeout(function(){ g.draw(); }, SECONDS_BETWEEN_FRAMES);
}

GameObjectManager.prototype.draw = function () {
  // calculate the time since the last frame
  var thisFrame  = +new Date();
  var dt         = (thisFrame - this.lastFrame)/1000;
  this.lastFrame = thisFrame;

  if (!this.resourcesLoaded){
    var numLoaded = 0;
    for (var i = 0; i < g_ResourceManager.imageProperties.length; ++i) {
      if (g_ResourceManager[g_ResourceManager.imageProperties[i]].complete)
        ++numLoaded;
    }

    if ( numLoaded == g_ResourceManager.imageProperties.length ) {
      // create a new ApplicationManager
      document.getElementById('hud_bottom').style.display = 'block';
      document.getElementById('loading').style.display = 'none';
      new ApplicationManager();
      this.resourcesLoaded = true;
    } else {
      document.getElementById('loading_count_current').innerHTML = numLoaded;
      document.getElementById('loading_count_max').innerHTML = g_ResourceManager.imageProperties.length;
      document.getElementById('loading_percent').style.width = numLoaded / g_ResourceManager.imageProperties.length * 300 + 'px';
    }
  }

  // clear the drawing contexts
  if (this.resourcesLoaded) {
    this.backBufferContext2D.clearRect(0, 0, this.backBuffer.width, this.backBuffer.height);
    this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // first update all the game objects
    for (x in this.gameObjects) {
      if (this.gameObjects[x] && this.gameObjects[x].update) {
        this.gameObjects[x].update(dt);
      }
    }

    // then draw the game objects
    for (x in this.gameObjects) {
      if (this.gameObjects[x] && this.gameObjects[x].draw) {
        this.gameObjects[x].draw(this.backBufferContext2D);
      }
    }
    
    // copy the back buffer to the displayed canvas
    this.context2D.drawImage(this.backBuffer, 0, 0);
  }
  var g = this;
  this.loop = setTimeout(function(){ g.draw(); }, SECONDS_BETWEEN_FRAMES);
};

GameObjectManager.prototype.endLoop = function() {
  clearInterval(this.loop);
};

GameObjectManager.prototype.addGameObject = function(gameObject) {
  gameObject.zOrder += Math.random();
  this.gameObjects.push(gameObject);
  this.gameObjects.sort(function(a,b){return a.zOrder - b.zOrder;});
};

GameObjectManager.prototype.removeGameObject = function(gameObject) {
  this.removeObject(gameObject);
};

GameObjectManager.prototype.removeObject = function(object) {
  for (var i in this.gameObjects) {
    if (this.gameObjects[i] === object) {
      this.gameObjects.splice(i, 1);
      break;
    }
  }
};

GameObjectManager.prototype.keyDown = function(event) {
  for (var x in this.gameObjects) {
    if (this.gameObjects[x].keyDown) {
      this.gameObjects[x].keyDown(event);
    }
  }  
  event.preventDefault();
};

GameObjectManager.prototype.keyUp = function(event) {
  for (var x in this.gameObjects) {
    if (this.gameObjects[x].keyUp) {
      this.gameObjects[x].keyUp(event);
    }
  }
  event.preventDefault();
};

GameObjectManager.prototype.mouseDown = function(event) {
  var cursor = new Rectangle(event.offsetX, event.offsetY, 1, 1);
  for (var x in this.gameObjects) {
    if (this.gameObjects[x].mouseDown && this.gameObjects[x].collisionArea().intersects(cursor)) {
      this.gameObjects[x].mouseDown(event);
    }
  }
  event.preventDefault();
};

GameObjectManager.prototype.mouseUp = function(event) {
  var cursor = new Rectangle(event.offsetX, event.offsetY, 1, 1);
  for (var x in this.gameObjects) {
    if (this.gameObjects[x].mouseUp && this.gameObjects[x].collisionArea().intersects(cursor)) {
      this.gameObjects[x].mouseUp(event);
    }
  }
  event.preventDefault();
};

GameObjectManager.prototype.mouseClick = function(event) {
  var cursor = new Rectangle(event.offsetX, event.offsetY, 1, 1);
  for (var x in this.gameObjects) {
    if (this.gameObjects[x].mouseClick && this.gameObjects[x].collisionArea().intersects(cursor)) {
      this.gameObjects[x].mouseClick(event);
    }
  }
  event.preventDefault()
};
