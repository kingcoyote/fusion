/**
    The base class for all elements that appear in the game.
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
*/
function VisualGameObject() {
    this.sprite = null;
    
    this.draw = function(dt, context, xScroll, yScroll) {
      this.sprite.draw(context, Math.ceil(this.x), Math.ceil(this.y));
    };
    
    this.update = function(dt) {
      if(this.sprite.update) {
        this.sprite.update(dt);
      }
    };
    
    this.startupVisualGameObject = function(image, x, y, z) {
        this.startupGameObject(x, y, z);
        this.sprite = new Sprite(image);
        return this;
    };
    
    this.shutdownVisualGameObject = function() {
        this.shutdownGameObject();
        this.sprite = null;
    };

    this.collisionArea = function() {
        return new Rectangle().startupRectangle(this.x, this.y, this.sprite.width, this.sprite.height);
    };
}

VisualGameObject.prototype = new GameObject;
