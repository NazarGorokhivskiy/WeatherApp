class SwipeManager {
  constructor(target) {
    target.addEventListener('touchmove', this.handleTouchMove, false);
    target.addEventListener('touchstart', this.handleTouchStart, false);

    this.xDown = null;
    this.yDown = null;
  }
  
  // Should be set from outer space
  onLeft = () => {
    console.log('Left swipe');
  }
  onRight = () => {
    console.log('Right swipe');
  }
  onUp = () => {
    console.log('Up swipe');
  }
  onDown = () => {
    console.log('Down swipe');
  }
  

  // Main logic
  getTouches = (evt) => {
    return evt.touches || evt.originalEvent.touches; 
  }

  handleTouchStart = (evt) => {
      const firstTouch = this.getTouches(evt)[0];
      this.xDown = firstTouch.clientX;
      this.yDown = firstTouch.clientY;
  };

  handleTouchMove = (evt) => {
      if ( ! this.xDown || ! this.yDown ) {
          return;
      }

      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;

      var xDiff = this.xDown - xUp;
      var yDiff = this.yDown - yUp;

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
          if ( xDiff > 0 ) {
              this.onLeft();
          } else {
              this.onRight();
          }
      } else {
          if ( yDiff > 0 ) {
              this.onUp();
          } else { 
              this.onDown();
          }
      }
      /* reset values */
      this.xDown = null;
      this.yDown = null;
  };
}