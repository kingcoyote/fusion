function AnimatedSprite(sprite, frames, duration, loop) {
  var delay = duration / frames.length,
      tick = delay,
      update = sprite.update,
      orig_frames = frames;
  
  sprite.setFrame(frames[0]);
  
  sprite.update = function(dt) {
    tick -= dt;
    if(tick <= 0) {
      sprite.setFrame(frames.splice(0,1));
      tick = delay + tick;
    }
    if(frames.length == 0 && ! loop) {
      sprite.update = update;
    } else {
      frames = Array.prototype.slice.call(frames);
    }
    update.call(sprite, dt);
  }
  
  return sprite;
};