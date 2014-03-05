var priceListService;

function PriceListService() {
  this.priceList = {
    standard: 25,
    rapid: 40,
    prime: 60,
    apostille: 75
  };
}

PriceListService.prototype.getPriceFor = function(order) { // in pounds(£)
  return order.certificate.numberOfCopies * this.priceList[order.certificate.serviceType] + (order.certificate.numberOfApostilles || 0) * this.priceList.apostille;
};

module.exports = function() {
  if(!priceListService) {
    priceListService = new PriceListService();
  }

  return priceListService;
};

