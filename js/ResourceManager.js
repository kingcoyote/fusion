function ResourceManager(images) {
  // initialize internal state.
  this.imageProperties = new Array();

  // for each image, call preload()
  for ( var i in images ) {
    // create new Image object and add to array
    var thisImage = new Image;
    this[i] = thisImage;
    this.imageProperties.push(i);

    // assign the .src property of the Image object
    thisImage.src = images[i];
  }
};
