//method    | path           | controller#action
//GET       /orders           orders#index
//POST      /orders           orders#create
//GET       /orders/new       orders#new
//GET       /orders/:id/edit  orders#edit
//DELETE    /orders/:id       orders#destroy
//PUT       /orders/:id       orders#update
//GET       /orders/:id       orders#show.
var db = require('./app/service/DbService')(compound),
    utilityService = require('./app/service/UtilityService').getInstance(),
    emailService = require('./app/service/EmailService')(),
    smsService = require('./app/service/SmsService')(),
    priceListService = require('./app/service/PriceListService')(),
    constants = require('./app/types/Constants'),
    stripePrivateKey = process.env.STRIPE_PRIVATE_KEY || 'sk_test_HQxbf0KgiKCHD3D7gzUl09pG',
    stripe = require('stripe')(stripePrivateKey);

var actions = {
  index: function() {
    var orders = [];
    db.collection('orders').find({}).toArray(function(err, result) {
      if (err) { console.log('>> err: ', err); }
      if (result) { console.log('>> result: ', result); }

      orders = result;
      send(orders);
    });
  },
  save: function() {
    var order = req.body,
        orderId = req.body._id;

    console.log('>> order received. order: ', order);

    if(orderId) {
      order._id = db.collection('orders').id(orderId);
    }

    var chargeToken = order.charge && order.charge.token;
    if(chargeToken) {
      order.referenceNumber = utilityService.createReferenceNumber();

      order.charge.amount = priceListService.getPriceFor(order);
      console.log('>> charging order. chargeToken: ' + chargeToken);
      stripe.charges.create({
        amount: order.charge.amount * 100, // amount in cents
        currency: "gbp",
        card: chargeToken,
        description: order.email
      }, function(err, charge) {
        console.log('>> charging result: ', err, charge);
        if (err) {
          send(err);
        } else {
          order.status = constants.status.order.paid;
          order.charge.token = ''; // reset token after successful charge
          db.collection('orders').save(order, function(err, result) {
            if (err) { console.log('>> err: ', err); }
            if (result) { console.log('>> result: ', result); }

            emailService.sendSuccessMessageFor(order);
            if (order.certificate.serviceType === constants.serviceType.prime) {
              smsService.sendSuccessMessageFor(order);
            }

            send(result);
          });
        }
      });
    } else {
      db.collection('orders').save(order, function(err, result) {
        if (err) { console.log('>> err: ', err); }
        if (result) { console.log('>> result: ', result); }

        send(result);
      });
    }
  },
  show: function() {
    var id = db.collection('orders').id(req.params.id);
    db.collection('orders').find({_id: id}).toArray(function(err, result) {
      if (err) { console.log('>> err: ', err); }
      order = result[0];
      console.log('>> order: ', order);
      send(order);
    });
  },
  get_by_query: function() {
    db.collection('orders').find(req.query).toArray(function(err, result) {
      if (err) { console.log('>> err: ', err); }
      send(result);
    });
  }
};

action('index', actions.index);
action('create', actions.save);
action('update', actions.save);
action('show', actions.show);
action('get_by_query', actions.get_by_query);