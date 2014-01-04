//method    | path           | controller#action
//GET       /customers           customers#index
//POST      /customers           customers#create
//GET       /customers/new       customers#new
//GET       /customers/:id/edit  customers#edit
//DELETE    /customers/:id       customers#destroy
//PUT       /customers/:id       customers#update
//GET       /customers/:id       customers#show.
var actions = {
  create: function () {
    var customer = new Customer(req.body);
    customer.save(function() {
      send(customer);
    });
  },
  update: function() {
    send({status: statusService.getStatus(req.params.id)});
  }
};

action('create', actions.create);
action('update', actions.update);
