"use strict";

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    files: {
      src: {
        app: {
          regex: 'app/**/*.js',
          config: {
            regex: 'config/**/*.js'
          },
          db: {
            regex: 'db/**/*.js'
          }
        },
        config: {
          gruntFile: 'Gruntfile.js',
          karmaFile: 'karma.conf.js'
        },
        assets: {
          regex: 'app/assets/**/*.coffee'
        },
        public: {
          dirVendor: 'public/vendor',
          output: 'public/javascripts/app.min.js',
          app: {
            output: 'public/javascripts/app.js',
            regex: 'public/javascripts/app/**/*.js'
          },
          vendor: {
              admin: {
                js: {
                  output: 'public/javascripts/vendor-admin.js',
                  files: [
                    '<%= files.src.public.dirVendor %>/angular/angular.min.js',
                    '<%= files.src.public.dirVendor %>/angular-resource/angular-resource.min.js',
                    '<%= files.src.public.dirVendor %>/angular-route/angular-route.min.js',
                    '<%= files.src.public.dirVendor %>/angular-xeditable/dist/js/xeditable.min.js',
                    '<%= files.src.public.dirVendor %>/angular-bootstrap/ui-bootstrap-tpls.min.js',
                    '<%= files.src.public.dirVendor %>/jquery/jquery.min.js',
                    '<%= files.src.public.dirVendor %>/jquery.inview/jquery.inview.min.js',
                    '<%= files.src.public.dirVendor %>/bootstrap/dist/js/bootstrap.min.js',
                    '<%= files.src.public.dirVendor %>/sugar/release/sugar.min.js'
                  ]
                },
                css: {
                  output: 'public/stylesheets/vendor-admin.css',
                  files: [
                    '<%= files.src.public.dirVendor %>/bootstrap/dist/css/bootstrap.min.css',
                    '<%= files.src.public.dirVendor %>/bootstrap/dist/css/bootstrap-theme.min.css',
                    '<%= files.src.public.dirVendor %>/font-awesome/css/font-awesome.min.css',
                    '<%= files.src.public.dirVendor %>/animate.css/animate.min.css',
                    '<%= files.src.public.dirVendor %>/angular-xeditable/dist/css/xeditable.css'
                  ]
                }
              },
              app: {
                js: {
                  output: 'public/javascripts/vendor-app.js',
                  files: [
                    '<%= files.src.public.dirVendor %>/angular/angular.min.js',
                    '<%= files.src.public.dirVendor %>/angular-cookies/angular-cookies.min.js',
                    '<%= files.src.public.dirVendor %>/angular-resource/angular-resource.min.js',
                    '<%= files.src.public.dirVendor %>/angular-bootstrap/ui-bootstrap-tpls.min.js',
                    '<%= files.src.public.dirVendor %>/jquery/jquery.min.js',
                    '<%= files.src.public.dirVendor %>/jquery.inview/jquery.inview.min.js',
                    '<%= files.src.public.dirVendor %>/bootstrap/dist/js/bootstrap.min.js',
                    '<%= files.src.public.dirVendor %>/sugar/release/sugar.min.js'
                  ]
                },
                css: {
                  output: 'public/stylesheets/vendor-app.css',
                  files: [
                    '<%= files.src.public.dirVendor %>/bootstrap/dist/css/bootstrap.min.css',
                    '<%= files.src.public.dirVendor %>/bootstrap/dist/css/bootstrap-theme.min.css',
                    '<%= files.src.public.dirVendor %>/font-awesome/css/font-awesome.min.css',
                    '<%= files.src.public.dirVendor %>/animate.css/animate.min.css'
                  ]
                }
              }
            }
        }
      },
      test: {
        frontend: {
          regex: 'test/frontend/**/*.coffee'
        },
        backend: {
          regex: 'test/backend/**/*.coffee'
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        unused: true,
        boss: true,
        eqnull: true,
        node: true,
        trailing: true,
        laxcomma: true,
        globals: {}
      },
      gruntfile: {
        src: '<%= files.src.config.gruntFile %>'
      },
      backend: {
        src: ['<%= files.src.app.regex %>', '<%= files.src.app.config.regex %>', '<%= files.src.app.db.regex %>']
      }
    },
    coffeelint: {
      options: {
        'max_line_length': {
          'level': 'ignore'
        }
      },
      frontend: { src: ['<%= files.src.assets.regex %>', '<%= files.test.frontend.regex %>'] },
      backend: { src: ['<%= files.test.backend.regex %>'] }
    },
    concat: {
      options: {
        stripBanners: true
      },
      vendor_js: {
        files: {
          '<%= files.src.public.vendor.app.js.output %>': '<%= files.src.public.vendor.app.js.files %>',
          '<%= files.src.public.vendor.admin.js.output %>': '<%= files.src.public.vendor.admin.js.files %>'
        }
      },
      vendor_css: {
        files: {
          '<%= files.src.public.vendor.app.css.output %>': '<%= files.src.public.vendor.app.css.files %>',
          '<%= files.src.public.vendor.admin.css.output %>': '<%= files.src.public.vendor.admin.css.files %>'
        }
      }
    },
    copy: {
      main: {
        expand: true,
        src: ['<%= files.src.public.dirVendor %>/bootstrap/fonts/*', '<%= files.src.public.dirVendor %>/font-awesome/fonts/*'],
        dest: 'public/fonts',
        flatten: true
      }
    },
    uglify: {
      dist: {
        src: ['<%= files.src.public.javascript.vendor.output %>', '<%= files.src.public.javascript.app.output %>'],
        dest: '<%= files.src.public.javascript.output %>'
      }
    },
    clean: {
      frontend: [
        '<%= files.src.public.vendor.app.js.output %>',
        '<%= files.src.public.vendor.admin.js.output %>',
        '<%= files.src.public.vendor.app.css.output %>',
        '<%= files.src.public.vendor.admin.css.output %>',
        'public/fonts'
      ]
    },
    mochacli: {
      options: {
        files: '<%= files.test.backend.regex %>'
      },
      spec: {
        options: {
          reporter: 'progress',
          compilers: ['coffee:coffee-script']
        }
      },
      tap: {
        options: {
          reporter: 'tap',
          compilers: ['coffee:coffee-script']
        }
      }
    },
    karma: {
      test: {
        configFile: '<%= files.src.config.karmaFile %>'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      backend: {
        files: ['<%= jshint.backend.src %>', '<%= coffeelint.backend.src %>'],
        tasks: ['jshint:backend', 'coffeelint:backend', 'test:backend']
      },
      frontend: {
        files: ['<%= coffeelint.frontend.src %>'],
        tasks: ['coffeelint:frontend', 'test:frontend']
      }
    }
  });
  var env = process.env.NODE_ENV || 'development';

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mocha-cli');

  grunt.registerTask('build', ['jshint', 'coffeelint', 'clean', 'copy', 'concat']);

  var testTask = ['mochacli:spec'];
  if (env !== 'development') { testTask = ['mochacli:tap']; }
  grunt.registerTask('test:frontend', ['karma:test']);
  grunt.registerTask('test:backend', testTask);
  grunt.registerTask('test', ['test:frontend', 'test:backend']);
};
