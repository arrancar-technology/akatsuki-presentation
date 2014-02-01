var actions = {
  index: function() {
    render({title: 'akatsuki presentation admin'});
  },
  orders_list: function() {
    render({title: 'UK Certificate - Orders'});
  }
};

action('index', actions.index);
action('orders_list', actions.orders_list);