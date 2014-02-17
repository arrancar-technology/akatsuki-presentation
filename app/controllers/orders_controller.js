//method    | path           | controller#action
//GET       /orders           orders#index
//POST      /orders           orders#create
//GET       /orders/new       orders#new
//GET       /orders/:id/edit  orders#edit
//DELETE    /orders/:id       orders#destroy
//PUT       /orders/:id       orders#update
//GET       /orders/:id       orders#show.
var db = require('./app/service/DbService')(compound);

var actions = {
  index: function() {
    var orders = [];
    db.collection('orders').find({}).toArray(function(err, result) {
      if (err) console.log('>> err: ', err);
      orders = result;
      send(orders);
    });
  },
  save: function() {
    var order = req.body,
        orderId = req.body._id;

    if(orderId) {
      order._id = db.collection('orders').id(orderId);
    }

    db.collection('orders').save(order, function(err, result) {
      if (err) console.log('>> err: ', err);
      if (result) console.log('>> result: ', result);
      send(result);
    });
  },
  show: function() {
    var id = db.collection('orders').id(req.params.id);
    db.collection('orders').find({_id: id}).toArray(function(err, result) {
      if (err) console.log('>> err: ', err)
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
