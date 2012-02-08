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
	  
	  if(this.repeat && this.spawn_repeat === false && this.y >= 0 && this.speed_y >= 0) {
	    this.spawn_repeat = true;
	    this.zOrder += 1;
	    new Background().startupBackground(
	      this.image, 
	      this.width, 
	      this.height, 
	      this.speed_x, 
	      this.speed_y, 
	      this.start_x, 
	      1 - this.height, 
	      this.repeat,
	      this.z
	    );
	  }
	}
};

Background.prototype = new VisualGameObject();
