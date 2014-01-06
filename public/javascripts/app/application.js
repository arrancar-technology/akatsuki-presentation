(function() {
  var app, controllers, factories;

  controllers = {
    CertificateDetailsController: [
      "$scope", "Customer", function($scope, Customer) {
        var num;
        $scope.model = {};
        $scope.model.step = 1;
        $scope.model.customer = new Customer();
        $scope.model.customer.serviceRequest = {};
        $scope.model.customer.serviceRequest.numberOfCopies = 1;
        $scope.model.customer.serviceRequest.numberOfApostilles = 1;
        $scope.model.customer.card = {};
        $scope.model.customer.card.type = 'visa';
        $scope.goToStep = function(step) {
          return $scope.model.step = step;
        };
        $scope.previousStep = function() {
          return $scope.model.step--;
        };
        $scope.nextStep = function() {
          return $scope.model.step++;
        };
        $scope.saveStepAdditionalInfo = function() {
          return Customer.create($scope.model.customer);
        };
        $scope.model.numberOfCopies = (function() {
          var _i, _results;
          _results = [];
          for (num = _i = 1; _i <= 10; num = ++_i) {
            _results.push({
              name: num,
              value: num
            });
          }
          return _results;
        })();
        $scope.model.numberOfApostilles = (function() {
          var _i, _results;
          _results = [];
          for (num = _i = 1; _i <= 10; num = ++_i) {
            _results.push({
              name: num,
              value: num
            });
          }
          return _results;
        })();
        $scope.model.yearsExpiry = (function() {
          var _i, _results;
          _results = [];
          for (num = _i = 2014; _i <= 2020; num = ++_i) {
            _results.push({
              name: num,
              value: num
            });
          }
          return _results;
        })();
        $scope.model.coutries = [];
        $scope.model.cardTypes = [
          {
            name: 'Visa',
            value: 'visa'
          }, {
            name: 'Visa Debit',
            value: 'visaDebit'
          }, {
            name: 'Master',
            value: 'master'
          }, {
            name: 'Maestro',
            value: 'maestro'
          }
        ];
        $scope.model.months = [
          {
            name: 'January',
            value: 1
          }, {
            name: 'February',
            value: 2
          }, {
            name: 'March',
            value: 3
          }, {
            name: 'April',
            value: 4
          }, {
            name: 'May',
            value: 5
          }, {
            name: 'June',
            value: 6
          }, {
            name: 'July',
            value: 7
          }, {
            name: 'August',
            value: 8
          }, {
            name: 'September',
            value: 9
          }, {
            name: 'October',
            value: 10
          }, {
            name: 'November',
            value: 11
          }, {
            name: 'December',
            value: 12
          }
        ];
        return $scope.model.days = (function() {
          var _i, _results;
          _results = [];
          for (num = _i = 1; _i <= 31; num = ++_i) {
            _results.push({
              name: num,
              value: num
            });
          }
          return _results;
        })();
      }
    ]
  };

  factories = {
    Customer: [
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
    ]
  };

  app = angular.module('main-app', ["ngResource"]);

  app.controller("CertificateDetailsController", controllers.CertificateDetailsController);

  app.factory("Customer", factories.Customer);

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
