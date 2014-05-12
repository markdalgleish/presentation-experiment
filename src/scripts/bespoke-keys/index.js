module.exports = function keys(options) {

  return function(deck) {
    var isVertical = options == 'vertical';

    document.addEventListener('keydown', function(e) {
      (
        e.which == 34 || // PAGE DOWN
        e.which == 32 || // SPACE
        !isVertical && e.which == 39 || // RIGHT
        isVertical && e.which == 40 // DOWN
      ) && deck.next();
      (
        e.which == 33 || // PAGE UP
        !isVertical && e.which == 37 || // LEFT
        isVertical && e.which == 38 // UP
      ) && deck.prev();
    });
  };

};
