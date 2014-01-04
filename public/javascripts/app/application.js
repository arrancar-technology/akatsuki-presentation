(function() {
  var app, controllers;

  controllers = {
    StatusController: [
      "$scope", function($scope) {
        return console.log("value: a");
      }
    ],
    CertificateDetailsController: [
      "$scope", "Customer", function($scope, Customer) {
        $scope.model = {};
        $scope.model.step = 1;
        $scope.model.customer = new Customer();
        $scope.saveStepAdditionalInfo = function() {
          console.log("value: b");
          $scope.model.customer.firstName = 'mmm';
          $scope.model.customer.lastName = 'iii';
          return Customer.create($scope.model.customer);
        };
        $scope.goToStep = function(step) {
          return $scope.model.step = step;
        };
        $scope.previousStep = function() {
          return $scope.model.step--;
        };
        return $scope.nextStep = function() {
          return $scope.model.step++;
        };
      }
    ]
  };

  app = angular.module('main-app', ["ngResource"]);

  app.controller("CertificateDetailsController", controllers.CertificateDetailsController);

  app.factory("Customer", [
    "$resource", function($resource) {
      return $resource("/api/1/customers/:id", {
        id: "@id"
      }, {
        create: {
          method: "POST"
        },
        update: {
          method: "PUT"
        }
      });
    }
  ]);

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

}).call(this);
