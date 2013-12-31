(function() {
  var app, controllers;

  controllers = {
    StatusController: function($scope) {}
  };

  app = angular.module('main-app', []);

  app.controller("StatusController", controllers.StatusController);

  app.directive("duplicate", function() {
    return {
      restrict: "E",
      scope: {
        value: "=ngModel"
      },
      controller: "StatusController",
      templateUrl: "/partials/duplicate"
    };
  });

  $('.apply-button').on('click', function() {
    var targetForm;
    targetForm = $(this).data('target-form');
    $("." + targetForm + " .certificate-show").removeClass('hidden');
    return $("." + targetForm + " .certificate-hide").addClass('hidden');
  });

}).call(this);
