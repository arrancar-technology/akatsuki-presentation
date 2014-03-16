var passport = require('passport');

function addUserToLocals(args) {
  args.req.locals.user = args.req.user; // needed for jade templates
  next();
}

before(addUserToLocals);

var actions = {
  index: function () {
    render({title: 'Admin - UK Certificate'});
  },
  status: function () {
    render({title: 'Admin - Status - UK Certificate'});
  },
  orders_list: function () {
    render({title: 'Admin - Orders - UK Certificate'});
  },
  login_get: function () {
    render('login', {title: 'Admin - Login - UK Certificate', redirectUrl: req.query.redirectUrl || ''});
  },
  login_post: function () {
    console.log('>> trying to login. user: ', req.body.email);

    var redirectUrl = req.query.redirectUrl;
    var failureQuery = redirectUrl ? '?redirectUrl=' + req.query.redirectUrl : '';
    passport.authenticate('local', { successRedirect: redirectUrl || '/admin', failureRedirect: '/login/admin' + failureQuery })(req, res, next);
  },
  logout: function () {
    req.logout();
    res.redirect('/login/admin');
  }
};

action('index', actions.index);
action('status', actions.status);
action('orders_list', actions.orders_list);
action('login_get', actions.login_get);
action('login_post', actions.login_post);
action('logout', actions.logout);