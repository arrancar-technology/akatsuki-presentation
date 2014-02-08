(function() {
  var app, controllers;

  controllers = {
    CertificateDetailsController: [
      "$scope", "$cookies", "Order", "Lookups", "PopoverService", function($scope, $cookies, Order, Lookups, PopoverService) {
        $scope.init = function(type) {
          var expiryYearStart, orderId, _i, _j, _ref, _results, _results1;
          $scope.type = type;
          $scope.model = {};
          $scope.model.step = {};
          $scope.model.step[1] = {};
          $scope.model.step[2] = {};
          $scope.model.step[3] = {};
          $scope.model.step.current = 1;
          orderId = $cookies.o_id;
          $scope.model.order = new Order();
          if (orderId) {
            Order.getOne({
              id: orderId
            }, function(order) {
              $scope.model.order._id = order._id;
              $scope.model.order.firstName = order.firstName;
              $scope.model.order.lastName = order.lastName;
              return $scope.model.order.email = order.email;
            });
          }
          $scope.model.order.status = 'received';
          $scope.model.order.certificate = {};
          $scope.model.order.certificate.type = $scope.type;
          $scope.model.order.certificate.numberOfCopies = 1;
          $scope.model.order.card = {};
          $scope.model.order.card.type = 'visa';
          $scope.model.order.address = {};
          $scope.model.order.address.country = 'GB';
          expiryYearStart = new Date().getFullYear();
          $scope.model.yearsExpiry = (function() {
            _results = [];
            for (var _i = expiryYearStart, _ref = expiryYearStart + 10; expiryYearStart <= _ref ? _i <= _ref : _i >= _ref; expiryYearStart <= _ref ? _i++ : _i--){ _results.push(_i); }
            return _results;
          }).apply(this);
          $scope.model.numberOfCopies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
          $scope.model.numberOfApostilles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
          $scope.model.countries = Lookups.countries;
          $scope.model.cardTypes = Lookups.cardTypes;
          $scope.model.months = Lookups.months;
          return $scope.model.days = (function() {
            _results1 = [];
            for (_j = 1; _j <= 31; _j++){ _results1.push(_j); }
            return _results1;
          }).apply(this);
        };
        $scope.goToStep = function(step) {
          return $scope.model.step.current = step;
        };
        $scope.previousStep = function() {
          return $scope.model.step.current--;
        };
        return $scope.nextStep = function() {
          var element, _i, _len, _ref, _results;
          $scope.model.step[$scope.model.step.current].submitted = true;
          if ($scope["" + $scope.type + "_form"].$valid && $scope.model.step.current === 1) {
            return $scope.model.step.current = 2;
          } else if ($scope.address_form.$valid && $scope.model.step.current === 2) {
            return $scope.model.step.current = 3;
          } else if ($scope.payment_form.$valid && $scope.model.step.current === 3) {
            return Order.create($scope.model.order);
          } else {
            _ref = $(".step." + $scope.model.step.current + " input[required]");
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              element = _ref[_i];
              _results.push(PopoverService.initializePopover($(element).attr('id')));
            }
            return _results;
          }
        };
      }
    ]
  };

  app = angular.module(appName);

  app.controller(controllers);

}).call(this);
