var YAML = require('yamljs')
  , rootDir = require('path').dirname(process.mainModule.filename)
  , applicationProperties = YAML.load(rootDir +'/application_properties.yaml')
  , db = require('./app/service/DbService')(compound);

var config = compound.app.get('config'),
    configOriginal = compound.app.get('configOriginal');

if(!configOriginal) {
  configOriginal = JSON.parse(JSON.stringify(config));
  compound.app.set('configOriginal', configOriginal);
}

var application = {
  reset: function() {
    compound.app.set('config', JSON.parse(JSON.stringify(configOriginal)));

    db.collection('orders').drop(function() { console.log('>> dropped the orders collection...'); });

    send(compound.app.get('config'));
  },
  statusApplicationVersion: function() {
    send({ applicationVersion: applicationProperties.applicationVersion });
  },
  statusCommitHash: function() {
    send({ commitHash: applicationProperties.commitHash });
  }
};

action('reset', application.reset);
action('statusApplicationVersion', application.statusApplicationVersion);
action('statusCommitHash', application.statusCommitHash);
