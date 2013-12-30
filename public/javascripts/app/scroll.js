(function() {
  $(".scroll-top").click(function() {
    return $("body,html").animate({
      scrollTop: 0
    }, 1000);
  });

  $(".scroll-down").click(function() {
    return $("body,html").animate({
      scrollTop: $(window).scrollTop() + 800
    }, 1000);
  });

  $("body").scrollspy({
    target: "#navbar"
  });

}).call(this);
