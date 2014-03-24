directives =
  orderListSection: ["Order", (Order) ->
    restrict: 'E'
    scope:
      certificatetype: '@'
    controller: 'OrdersListSectionController'
    template: '<div ng-include="contentUrl"></div>'
    link: (scope, elem, attrs) ->
      scope.contentUrl = '/partials/order_list_section_' + scope.certificatetype

      scope.$watch "model.filter", (oldVal, newVal) ->
        scope.model.orders = Order.get {}, ->
  ]

app = angular.module appName
app.directive 'orderListSection', directives.orderListSection