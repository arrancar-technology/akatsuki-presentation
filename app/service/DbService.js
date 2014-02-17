var db;

module.exports = function(compound) {
  if(!db) {
    var config = compound.app.get('config');
    db = require('mongoskin').db(config.database.url);
  }

  return db;
};

