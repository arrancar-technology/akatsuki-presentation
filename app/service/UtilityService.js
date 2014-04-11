var utilityService;


function extractSequenceNumber(lastReferenceNumber) {
  return parseInt(lastReferenceNumber.substring(3, 9), 10);
}

function UtilityService(lastReferenceNumber) {
  this.lastSequenceNumber = extractSequenceNumber(lastReferenceNumber);
}

UtilityService.prototype.createReferenceNumber = function() {
  var referenceCode = "R",
      stationCode = ["A1", "B4", "C7", "K0", "L3", "M6", "Z4"][new Date().getDay()],  // randomize by day of the week
      sequenceNumber = ++this.lastSequenceNumber,  // 6 digit
      randomNumber = this.generateRandomNumber(3);

  return referenceCode + stationCode + sequenceNumber + randomNumber;
};

UtilityService.prototype.generateRandomNumber = function(byDigit) {
  return Math.floor((Math.random() * Math.pow(10, byDigit)) + 1);
};

module.exports = {
  SEED_ORDER_REFERENCE_NUMBER: "RZ4102010823",
  init: function (lastReferenceNumber) {
    if(!utilityService) {
      utilityService = new UtilityService(lastReferenceNumber);
    }

    return utilityService;
  },
  getInstance: function() {
    return utilityService;
  }
};
