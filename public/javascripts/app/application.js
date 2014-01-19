(function() {
  var app, bootstrapEnv, controllers, factories, findBootstrapEnvironment, initializePopover, placement, popoverContents, popoverOptions;

  findBootstrapEnvironment = function() {
    var $el, envVal, envValues, envs, i;
    envs = ["ExtraSmall", "Small", "Medium", "Large"];
    envValues = ["xs", "sm", "md", "lg"];
    $el = $("<div>");
    $el.appendTo($("body"));
    i = envValues.length - 1;
    while (i >= 0) {
      envVal = envValues[i];
      $el.addClass("hidden-" + envVal);
      if ($el.is(":hidden")) {
        $el.remove();
        return envs[i];
      }
      i--;
    }
  };

  bootstrapEnv = findBootstrapEnvironment();

  placement = (bootstrapEnv === "ExtraSmall" ? "bottom" : "right");

  popoverOptions = {
    'trigger': "focus",
    'container': "body",
    'toggle': "popover",
    'placement': placement,
    'original-title': "",
    'title': ""
  };

  popoverContents = {
    "year-of-birth": "Please enter year of birth in YYYY format",
    "place-of-birth": "Please enter place of birth",
    "last-name-at-birth": "Please enter last name at birth",
    "first-name-at-birth": "Please enter first name at birth"
  };

  initializePopover = function(elementId) {
    return $("#" + elementId).popover(Object.merge(popoverOptions, {
      'content': popoverContents[elementId]
    }));
  };

  controllers = {
    CertificateDetailsController: [
      "$scope", "Customer", function($scope, Customer) {
        var _i, _results;
        $scope.model = {};
        $scope.model.step = {};
        $scope.model.step[1] = {};
        $scope.model.step[2] = {};
        $scope.model.step[3] = {};
        $scope.model.step.current = 1;
        $scope.model.customer = new Customer();
        $scope.model.customer.serviceRequest = {};
        $scope.model.customer.serviceRequest.numberOfCopies = 1;
        $scope.model.customer.serviceRequest.numberOfApostilles = 1;
        $scope.model.customer.card = {};
        $scope.model.customer.card.type = 'visa';
        $scope.goToStep = function(step) {
          return $scope.model.step.current = step;
        };
        $scope.previousStep = function() {
          return $scope.model.step.current--;
        };
        $scope.nextStep = function() {
          var element, _i, _len, _ref;
          if ($scope.birth_form.$valid) {
            $scope.model.step.current++;
          } else {
            _ref = $(".step." + $scope.model.step.current + " input[required]");
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              element = _ref[_i];
              initializePopover($(element).attr('id'));
            }
          }
          return $scope.model.step[$scope.model.step.current].submitted = true;
        };
        $scope.saveStepAdditionalInfo = function() {
          return Customer.create($scope.model.customer);
        };
        $scope.model.numberOfCopies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        $scope.model.numberOfApostilles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        $scope.model.yearsExpiry = [2014, 2015, 2016, 2017, 2018, 2019, 2020];
        $scope.model.coutries = [];
        $scope.model.cardTypes = {
          'visa': 'Visa',
          'visaDebit': 'Visa Debit',
          'master': 'Master',
          'maestro': 'Maestro'
        };
        $scope.model.months = {
          1: 'January',
          2: 'February',
          3: 'March',
          4: 'April',
          5: 'May',
          6: 'June',
          7: 'July',
          8: 'August',
          9: 'September',
          10: 'October',
          11: 'November',
          12: 'December'
        };
        return $scope.model.days = (function() {
          _results = [];
          for (_i = 1; _i <= 31; _i++){ _results.push(_i); }
          return _results;
        }).apply(this);
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
