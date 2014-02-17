//helper  | method | path                   | controller#action
//posts     GET      /posts                   posts#index
//posts     POST     /posts                   posts#create
//new_post  GET      /posts/new               posts#new
//edit_post GET      /posts/:id/edit          posts#edit
//post      DELETE   /posts/:id               posts#destroy
//post      PUT      /posts/:id               posts#update
//post      GET      /posts/:id               posts#show.

var statusService = require('./app/service/StatusService');

var actions = {
  index: function () {
    send({status: statusService.getStatus()});
  },
  show: function() {
    send({status: statusService.getStatus(req.params.id)});
  }
};

action('index', actions.index);
action('show', actions.show);
