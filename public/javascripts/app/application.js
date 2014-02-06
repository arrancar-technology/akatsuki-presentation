(function() {
  var app, appName, exports;

  appName = 'main-app';

  app = angular.module(appName, ["ngResource", "ngCookies"]);

  $('.apply-button').on('click', function() {
    var targetForm;
    targetForm = $(this).data('target-form');
    $("." + targetForm + " .certificate-show").removeClass('hidden');
    return $("." + targetForm + " .certificate-hide").addClass('hidden');
  });

  $('.animate-inview').one('inview', function() {
    return setTimeout((function() {
      return $('.animate').removeClass('invisible').addClass('animated');
    }), 500);
  });

  exports = this;

  exports.appName = appName;

}).call(this);
