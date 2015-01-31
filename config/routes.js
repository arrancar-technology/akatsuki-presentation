exports.routes = function (map) {

  map.get('/', 'homepage#homepage');

  // Certificate Homepages
  map.get('/replacement-birth-certificate', 'homepage#birth');
  map.get('/replacement-marriage-certificate', 'homepage#marriage');
  map.get('/copy-of-death-certificate', 'homepage#death');

  // Certificate Order Pages
  map.get('/certificate/success', 'certificate#success');
  map.get('/certificate/:section/:serviceType?', 'certificate#additionalDetails');

  // Order
  map.get('api/1/orders/custom', 'orders#get_by_query');
  map.resources('orders', { path: 'api/1/orders' });

  // Partials
  map.get('partials/:partial', 'partials#show');

  // Blog
  map.get('/blog', 'blog#index');
  map.get('/blog/:articleTitle', 'blog#show');

  // Admin
  var loginService = require('./../app/service/LoginService').getInstance();
  map.get('admin', 'admin#index', [loginService.ensureAuthenticated]);
  map.get('admin/status', 'admin#status', [loginService.ensureAuthenticated]);
  map.get('admin/status/*', 'admin#status', [loginService.ensureAuthenticated]);
  map.get('admin/orders', 'admin#orders_list', [loginService.ensureAuthenticated]);
  map.get('admin/sendCheckingInEmail', 'admin#sendCheckingInEmail', [loginService.ensureAuthenticated]);
  map.resources('status', { path: 'api/1/status' }, [loginService.ensureAuthenticated]);

  // Fixtures
  map.get('fixture/reset', 'fixture#reset');
  map.get('fixture/status/applicationVersion', 'fixture#statusApplicationVersion');
  map.get('fixture/status/commitHash', 'fixture#statusCommitHash');

  // Login - Logout
  map.get('login/admin', 'admin#login_get');
  map.post('login/admin', 'admin#login_post');
  map.get('logout/admin', 'admin#logout');

  // Google Webmaster Tool verification
  map.get('googlef46f912f19ecdab2.html', 'static#googleWebmasterToolVerify');

  map.get('/:staticPage', 'static#staticPage');
};
