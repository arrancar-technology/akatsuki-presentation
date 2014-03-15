//method    | path           | controller#action
//GET       /orders           orders#index
//POST      /orders           orders#create
//GET       /orders/new       orders#new
//GET       /orders/:id/edit  orders#edit
//DELETE    /orders/:id       orders#destroy
//PUT       /orders/:id       orders#update
//GET       /orders/:id       orders#show.
var db = require('./app/service/DbService')(compound),
  priceListService = require('./app/service/PriceListService')(),
  constants = require('./app/types/Constants'),
  stripePrivateKey = process.env.STRIPE_PRIVATE_KEY || 'sk_test_D5DgGB4bKmT9isRiYR9yA4ED',
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
    if(chargeToken) { order.charge.amount = priceListService.getPriceFor(order); }
    if(chargeToken) {
      console.log('>> charging order. chargeToken: ' + chargeToken);
      stripe.charges.create({
        amount: order.charge.amount * 100, // amount in cents
        currency: "gbp",
        card: chargeToken,
        description: order.email
      }, function(err, charge) {
        console.log('>> charging result: ', err, charge);
        if (err && err.type === 'StripeCardError') {
          // TODO: [DK] The card has been declined
          send(result);
        }
        if (err) {
          // TODO: [DK] Handle error
          send(result);
        } else {
          order.status = constants.status.order.paid;
          db.collection('orders').save(order, function(err, result) {
            if (err) { console.log('>> err: ', err); }
            if (result) { console.log('>> result: ', result); }

            // TODO: [DK] send an email
            send(result);
          });
        }
      });
    } else {
      order.status = constants.status.order.created;
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
  }
};

action('index', actions.index);
action('create', actions.save);
action('update', actions.save);
action('show', actions.show);