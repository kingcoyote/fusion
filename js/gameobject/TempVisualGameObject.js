function TempVisualGameObject() {
  this.startupTempVisualGameObject = function(image, x, y, z, life){
    this.life = life;
    this.startupVisualGameObject(image, x, y, z);
  };
  
  this.update = function(dt, context, xScroll, yScroll) {
    this.life -= dt;
    if(this.life <= 0) {
      this.shutdownVisualGameObject();
    };
  };
}

TempVisualGameObject.prototype = new VisualGameObject();
