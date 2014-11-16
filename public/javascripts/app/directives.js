(function() {
  var app, directives;

  directives = {
    apply: [
      function() {
        return {
          restrict: 'C',
          scope: {
            formtype: '@'
          },
          controller: [
            '$scope', '$cookies', '$window', 'Order', 'PopoverService', function($scope, $cookies, $window, Order, PopoverService) {
              $scope.model = {};
              $scope.model.order = new Order();
              $scope.model.order.status = 'created';
              return $scope.proceed = function() {
                var element, _i, _len, _ref, _results;
                $scope.model.submitted = true;
                if ($scope.apply_form.$valid) {
                  $scope.model.order.certificate = {};
                  $scope.model.order.certificate.type = $scope.formtype;
                  Order.create($scope.model.order, function(order) {
                    $cookies.o_id = order._id;
                    return $window.location.href = "/certificate/" + $scope.formtype;
                  });
                }
                _ref = $(".applyForm." + $scope.formtype + " input[required]");
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  element = _ref[_i];
                  _results.push(PopoverService.initializePopover($(element).attr('id')));
                }
                return _results;
              };
            }
          ],
          templateUrl: '/partials/form_apply'
        };
      }
    ],
    pricingPanel: [
      function() {
        return {
          restrict: 'E',
          scope: {
            panelType: '@',
            panelStyle: '@',
            mostPopular: '@',
            scanAndEmail: '@',
            trackingEmail: '@',
            trackingSms: '@'
          },
          controller: [
            '$scope', 'Lookups', function($scope, Lookups) {
              $scope.model = {};
              return $scope.model.serviceType = Lookups.serviceTypes[$scope.panelType];
            }
          ],
          templateUrl: '/partials/price_panel'
        };
      }
    ]
  };

  app = angular.module(appName);

  app.directive('apply', directives.apply);

  app.directive('pricingPanel', directives.pricingPanel);

}).call(this);
