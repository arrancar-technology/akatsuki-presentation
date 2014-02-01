//method    | path           | controller#action
//GET       /customers           customers#index
//POST      /customers           customers#create
//GET       /customers/new       customers#new
//GET       /customers/:id/edit  customers#edit
//DELETE    /customers/:id       customers#destroy
//PUT       /customers/:id       customers#update
//GET       /customers/:id       customers#show.
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
