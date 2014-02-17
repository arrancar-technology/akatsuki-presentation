exports.routes = function (map) {

  map.get('/', 'homepage#show');

  // Certificate Details
  map.post('/certificate/:section', 'certificate#personalDetails');
  map.get('/certificate/:section', 'certificate#additionalDetails');

  // Order
  map.resources('orders', { path: 'api/1/orders' });

  // Partials
  map.get('partials/:partial', 'partials#show');

  // Admin
  var loginService = require('./../app/service/LoginService').getInstance();
  map.get('admin', 'admin#index', [loginService.ensureAuthenticated]);
  map.get('admin/status', 'admin#status', [loginService.ensureAuthenticated]);
  map.get('admin/status/*', 'admin#status', [loginService.ensureAuthenticated]);
  map.get('admin/orders', 'admin#orders_list', [loginService.ensureAuthenticated]);
  map.resources('status', { path: 'api/1/status' }, [loginService.ensureAuthenticated]);

  // Fixtures
  map.get('fixture/reset', 'fixture#reset');
  map.get('fixture/status/applicationVersion', 'fixture#statusApplicationVersion');
  map.get('fixture/status/commitHash', 'fixture#statusCommitHash');

  // Login - Logout
  map.get('login/admin', 'admin#login_get');
  map.post('login/admin', 'admin#login_post');
  map.get('logout/admin', 'admin#logout');
};
