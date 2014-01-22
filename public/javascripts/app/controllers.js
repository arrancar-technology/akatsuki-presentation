(function() {
  var app, bootstrapEnv, controllers, findBootstrapEnvironment, initializePopover, placement, popoverContents, popoverOptions;

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
      "$scope", "Customer", "Lookups", function($scope, Customer, Lookups) {
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
        $scope.model.customer.card = {};
        $scope.model.customer.card.type = 'visa';
        $scope.model.address = {};
        $scope.model.address.country = 'GB';
        $scope.goToStep = function(step) {
          return $scope.model.step.current = step;
        };
        $scope.previousStep = function() {
          return $scope.model.step.current--;
        };
        $scope.nextStep = function() {
          var element, _i, _len, _ref, _results;
          $scope.model.step[$scope.model.step.current].submitted = true;
          if ($scope.birth_form.$valid) {
            return $scope.model.step.current = 2;
          } else if ($scope.service_request_form.$valid && $scope.address_form.$valid) {
            return $scope.model.step.current = 3;
          } else if ($scope.birth_form.$valid) {
            return $scope.model.step.current = 4;
          } else {
            _ref = $(".step." + $scope.model.step.current + " input[required]");
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              element = _ref[_i];
              _results.push(initializePopover($(element).attr('id')));
            }
            return _results;
          }
        };
        $scope.saveStepAdditionalInfo = function() {
          return Customer.create($scope.model.customer);
        };
        $scope.model.numberOfCopies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        $scope.model.numberOfApostilles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        $scope.model.yearsExpiry = [2014, 2015, 2016, 2017, 2018, 2019, 2020];
        $scope.model.countries = Lookups.countries;
        $scope.model.cardTypes = Lookups.cardTypes;
        $scope.model.months = Lookups.months;
        return $scope.model.days = (function() {
          _results = [];
          for (_i = 1; _i <= 31; _i++){ _results.push(_i); }
          return _results;
        }).apply(this);
      }
    ]
  };

  app = angular.module('main-app');

  app.controller(controllers);

}).call(this);
