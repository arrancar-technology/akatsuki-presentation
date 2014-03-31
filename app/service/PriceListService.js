var priceListService;

function PriceListService() {
  this.priceList = {
    standard: {
      certificate: 25,
      apostille: 75
    },
    rapid: {
      certificate: 40,
      apostille: 120
    },
    prime: {
      certificate: 60,
      apostille: 180
    }
  };
}

PriceListService.prototype.getPriceFor = function(order) { // in pounds(£)
  var totalCertificatePrice = order.certificate.numberOfCopies * this.priceList[order.certificate.serviceType].certificate,
      totalApostillePrice = (order.certificate.numberOfApostilles || 0) * this.priceList[order.certificate.serviceType].apostille;

  return totalCertificatePrice + totalApostillePrice;
};

module.exports = function() {
  if(!priceListService) {
    priceListService = new PriceListService();
  }

  return priceListService;
};

