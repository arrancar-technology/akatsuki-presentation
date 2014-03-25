directives =
  orderListSection: ["$http", ($http) ->
    restrict: 'E'
    scope:
      certificatetype: '@'
    controller: 'OrdersListSectionController'
    template: '<div ng-include="contentUrl"></div>'
    link: (scope, elem, attrs) ->
      scope.contentUrl = '/partials/order_list_section_' + scope.certificatetype

      scope.$watch "model.filter", (oldVal, newVal) ->
        $http.get("/api/1/orders/custom?certificate.type=" + scope.certificatetype + "&status=" + scope.model.filter)
          .success((data, status, headers, config) ->
            scope.model.orders = data
          )
          .error (data, status, headers, config) ->
            # TODO: [DK] display error on the page
  ]

app = angular.module appName
app.directive 'orderListSection', directives.orderListSection