function Background(){
	this.width  = 3000;
	this.height = 3000;
	
	this.x_move = 0;
	this.y_move = -1;
	
	this.min_speed = 8;
	this.speed_range = 8;
	
	this.x_speed = 0;
	this.y_speed = this.speed_range * Math.random() + this.min_speed;
	
	this.startupBackground = function(image) {
		var x = (this.width - g_GameObjectManager.canvas.width) * Math.random();
		var y = (this.height - g_GameObjectManager.canvas.height); 
		return this.startupVisualGameObject(image, 0 - x, 0 - y, -1);
	}
	
	this.update = function(dt, context, xScroll, yScroll) {
		
		// hit right edge
		if(this.x + this.width <= g_GameObjectManager.canvas.width) {
			this.x_move = 1;
			this.change_speed();
		}
		// hit left edge
		if(this.x >= 0) {
			this.x_move = -1;
			this.change_speed();
		}
		
		// hit bottom edge
		if(this.y + this.height <= g_GameObjectManager.canvas.height) {
			this.y_move = 1;
			this.change_speed();
		}
		// hit top edge
		if(this.y >= 0) {
			this.y_move = -1;
			this.change_speed();
		}
	
		this.x += (dt * this.x_speed) * this.x_move;
		this.y += (dt * this.y_speed) * this.y_move;
	}

	this.change_speed = function() {
		this.y_speed = this.speed_range * Math.random() + this.min_speed;
	this.x_speed = this.speed_range * Math.random() + this.min_speed;
	};
};

Background.prototype = new VisualGameObject();
