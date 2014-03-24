(function() {
  var app, directives;

  directives = {
    orderListSection: [
      "Order", function(Order) {
        return {
          restrict: 'E',
          scope: {
            certificatetype: '@'
          },
          controller: 'OrdersListSectionController',
          template: '<div ng-include="contentUrl"></div>',
          link: function(scope, elem, attrs) {
            scope.contentUrl = '/partials/order_list_section_' + scope.certificatetype;
            return scope.$watch("model.filter", function(oldVal, newVal) {
              return scope.model.orders = Order.get({}, function() {});
            });
          }
        };
      }
    ]
  };

  app = angular.module(appName);

  app.directive('orderListSection', directives.orderListSection);

}).call(this);
