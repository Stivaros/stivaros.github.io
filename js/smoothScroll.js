  var $root = $('html, body');
  $('.navbar-nav a').click(function () {
    var href = $.attr(this, 'href');
    if (href != '') {
      $root.animate({
        scrollTop: $(href).offset().top
      }, 500, function () {
        window.location.hash = href;
      });
      return false;
    }
  });
  // TODO: Minify JS