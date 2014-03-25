(function() {
  var app, directives;

  directives = {
    orderListSection: [
      "$http", function($http) {
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
              return $http.get("/api/1/orders/custom?certificate.type=" + scope.certificatetype + "&status=" + scope.model.filter).success(function(data, status, headers, config) {
                return scope.model.orders = data;
              }).error(function(data, status, headers, config) {});
            });
          }
        };
      }
    ]
  };

  app = angular.module(appName);

  app.directive('orderListSection', directives.orderListSection);

}).call(this);
