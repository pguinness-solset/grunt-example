'use strict';

module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  /**
   * Set path variables for the files we want to include in the build
   */
  var appConfigVars = {
    bowerSource: 'bower_components',
    source: 'js',
    buildPath: 'js/build'
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    appConfig: appConfigVars,

    /**
     * Set up server at http://localhost:9000
     */
    connect: {
      'static': {
        options: {
          hostname: 'localhost',
          port: 9000
        }
      }
    },
    /**
     * Open browser window
     */
    open: {
      server: {
        url: 'http://localhost:<%= connect.static.options.port %>'
      }
    },
    /**
     * Keep the server running. Apparently this needs to be included
     * here, even though we're not adding any config options.
     */
    regarde: {},

    /**
     * Watch for changes to all Javascript files that aren't in the 'build' folder.
     * 'build' is where minified/concatenated files will be placed.
     */
    watch: {
      scripts: {
        files: [
          '<%= appConfig.source %>/{,*/}*.js',
          '!<%= appConfig.buildPath %>/*'
        ],
        tasks: ['build']
      }
    },

    concat: {

      /**
       * Concatenate 3rd party Javascript libraries into a single vendor.js file.
       */
      vendorScripts: {
        files: [
          {
            dest: '<%= appConfig.buildPath %>/vendor.js',
            src: [
              '<%= appConfig.bowerSource %>/jquery/dist/jquery.js',
              '<%= appConfig.bowerSource %>/angular/angular.js',
              '<%= appConfig.bowerSource %>/angular-cache/dist/angular-cache.js',
              '<%= appConfig.bowerSource %>/angular-animate/angular-animate.js'
            ]
          }
        ]
      },

      /**
       * Concatenate custom Javascript into a single scripts.js file.
       */
      customScripts: {
        files: [
          {
            dest: '<%= appConfig.buildPath %>/scripts.js',
            src: [
              '<%= appConfig.source %>/app.js',
              '<%= appConfig.source %>/controllers/{,*/}*.js',
              '<%= appConfig.source %>/directives/{,*/}*.js',
              '<%= appConfig.source %>/filters/{,*/}*.js',
              '<%= appConfig.source %>/services/{,*/}*.js'
            ]
          }
        ]
      }
    },

    uglify: {

      /**
       * Minify concatenated vendor.js into vendor.min.js.
       */
      vendorScripts: {
        files: [
          {dest: '<%= appConfig.buildPath %>/vendor.min.js', src: ['<%= appConfig.buildPath %>/vendor.js']},
          {dest: '<%= appConfig.buildPath %>/modernizr.min.js', src: ['<%= appConfig.bowerSource %>/modernizr/modernizr.js']}
        ]
      },

      /**
       * Minify concatenated scripts.js into scripts.min.js.
       * @type {Object}
       */
      customScripts: {
        files: [
          {dest: '<%= appConfig.buildPath %>/scripts.min.js', src: ['<%= appConfig.buildPath %>/scripts.js']}
        ]
      }
    },

    copy: {

      /**
       * Copy additional files used by vendor scripts.
       */
      vendorScripts: {
        files: [{
          expand: true,
          flatten: true,
          cwd: '<%= appConfig.bowerSource %>',
          dest: '<%= appConfig.source %>',
          src: [
            'jquery/dist/jquery.min.map',
            'angular/angular.min.js.map'
          ]
        }]
      }
    },

    /**
     * Runs files through jshint to look for syntax errors. Uses the config in /.jshintrc 
     */
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        ignores: [
          '<%= appConfig.buildPath %>/*.js'
        ]
      },
      all: [
        'Gruntfile.js',
        '<%= appConfig.source %>/js/{,*/}*.js'
      ]
    },
  });


  /**
   * Start a local server instance.
   *
   * Command: grunt server
   */
  grunt.registerTask('server', [
    'connect:static',
    'open',
    'regarde'
  ]);

  /**
   * Start a watcher that looks for changes in custom Javascript files. And builds
   * concatenated, minified files.
   *
   * Command: grunt watcher
   */
  grunt.registerTask('watcher',[
    'watch'
  ]);

  /**
   * Build all custom scripts.
   * Note: If you're already running 'grunt watcher' you don't need to run this command.
   *
   * Command: grunt build
   */
  grunt.registerTask('build', [
    'jshint',
    'concat:customScripts',
    'uglify:customScripts'
  ]);

  /**
   * Concatenate and minify all 3rd party scripts into separate file.
   * Not included in the watcher. Must be run explicitly if you want to add additional vendor libraries.
   * 
   * Command: grunt buildVendorScripts
   */
  grunt.registerTask('buildVendorScripts', [
    'concat:vendorScripts',
    'uglify:vendorScripts',
    'copy:vendorScripts'
  ]);


  /**
   * If you simply type 'grunt' in your command line, it will run the 'grunt server' command.
   */
  grunt.registerTask('default', ['server']);
};