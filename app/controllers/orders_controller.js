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
      if (err) throw err;
      orders = result;
      send(orders);
    });

  },
  create: function () {
    db.collection('orders').save(req.body, function(err, result) {
      if (err) throw err;
      if (result) console.log('Result: ', result);
    });
  }
};

action('index', actions.index);
action('create', actions.create);
