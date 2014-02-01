exports.routes = function (map) {

  map.get('/', 'homepage#show');

  // Certificate Details
  map.post('/certificate/:section', 'certificate#personalDetails');
  map.get('/certificate/:section', 'certificate#additionalDetails');

  // Customer
  map.resources('customers', { path: 'api/1/customers' });

  // Partials
  map.get('partials/:partial', 'partials#show');

  // Admin
  map.get('admin/status', 'admin#index');
  map.get('admin/status/*', 'admin#index');
  map.get('admin/orders', 'admin#orders_list');
  map.resources('status', { path: 'api/1/status' });

  // Fixtures
  map.get('fixture/reset', 'fixture#reset');
  map.get('fixture/status/applicationVersion', 'fixture#statusApplicationVersion');
  map.get('fixture/status/commitHash', 'fixture#statusCommitHash');
};
