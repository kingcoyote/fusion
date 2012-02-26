function Background(){
  this.width = 0;
  this.height = 0;
  this.speed = 0;
  
	this.startupBackground = function(image, width, height, speed_x, speed_y, start_x, start_y, repeat, z) {
	  this.image = image;
	  this.width = width;
		this.height = height;
		this.speed_x = speed_x;
		this.speed_y = speed_y;
		this.start_x = start_x;
		this.start_y = start_y;
		this.repeat = repeat;
		this.spawn_repeat = false;
		this.z = z;
		return this.startupVisualGameObject(image, start_x, start_y, z);
	};
	
	this.update = function(dt, context, xScroll, yScroll) {
	  this.y += dt * this.speed_y;
	  this.x += dt * this.speed_x;
	  
	  
	};
	
	this.draw = function(dt, context, xScroll, yScroll) {
      context.drawImage(this.sprite.source, this.x, this.y);
      
      // if the y value is above 0, we need to duplicate the image on top
      if(this.y >= 0) {
        context.drawImage(this.sprite.source, this.x, this.y - this.height);
      }
      
      // if the y value is above canvas height, we need to reset the image
      if(this.y >= g_GameObjectManager.canvas.height) {
        this.y = g_GameObjectManager.canvas.height - this.height;
      }
  };
};

Background.prototype = new VisualGameObject();
