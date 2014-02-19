module.exports = function (config) {
  config.set({
    basePath: '',
    autoWatch: true,
    frameworks: ['mocha'],
    files: [
      'public/vendor/angular/angular.min.js',
      'public/vendor/angular-resource/angular-resource.min.js',
      'public/vendor/jquery/jquery.min.js',
      'public/vendor/bootstrap/dist/js/bootstrap.min.js',
      'test/lib/**/*.js',
      'app/**/*.coffee',
      'test/frontend/**/*.coffee'
    ],
    browsers: ['PhantomJS'],

    reporters: ['progress', 'coverage'],
    preprocessors: {
      'app/**/*.coffee': ['coffee'],
      'test/**/*.coffee': ['coffee']
    },

    singleRun: true
  });
};
