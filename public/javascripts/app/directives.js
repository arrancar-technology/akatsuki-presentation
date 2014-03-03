(function() {
  var app, directives;

  directives = {
    applyForm: [
      function() {
        return {
          restrict: 'E',
          scope: {
            formtype: '@'
          },
          controller: [
            '$scope', '$cookies', '$window', 'Order', 'PopoverService', function($scope, $cookies, $window, Order, PopoverService) {
              $scope.model = {};
              $scope.model.order = new Order();
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
                _ref = $(".applyForm input[required]");
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
    ]
  };

  app = angular.module(appName);

  app.directive('applyForm', directives.applyForm);

}).call(this);
