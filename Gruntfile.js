module.exports = function(grunt) {

  /**
   * Initialize grunt
   */
  grunt.initConfig({

    /**
     * Read package.json
     */
    pkg: grunt.file.readJSON('package.json'),


    /**
     * Set banner
     */
    banner: '/**\n' +
    '<%= pkg.title %> - <%= pkg.version %>\n' +
    '<%= pkg.homepage %>\n' +
    'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
    'License: <%= pkg.license %>\n' +
    '*/\n',


    /**
     * Set directory paths
     */
    dir: {
      js: 'js'
    },

    /**
     * JSHint
     * @github.com/gruntjs/grunt-contrib-jshint
     */
    jshint: {
      gruntfile: 'Gruntfile.js',
      files: ['<%= dir.js %>/src/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },


    /**
     * Concatenate
     * @github.com/gruntjs/grunt-contrib-concat
     */
    concat: {
      options: {
        stripBanners: true,
        banner: '<%= banner %>'
      },
      js: {
        src: '<%= jshint.files %>',
        dest: '<%= dir.js %>/payPalForm.js'
      },
    },

    /**
     * Minify
     * @github.com/gruntjs/grunt-contrib-uglify
     */
    uglify: {

      // Uglify options
      options: {
        banner: '<%= banner %>'
      },

      // Minify js files in js/src/
      dist: {
        src: ['<%= concat.js.dest %>'],
        dest: '<%= dir.js %>/payPalForm.min.js'
      },
    },

    /**
     * Watch
     * @github.com/gruntjs/grunt-contrib-watch
     */
    watch: {

      // JShint Gruntfile
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile'],
      },
      // JShint, concat + uglify JS on change
      js: {
        files: '<%= jshint.files %>',
        tasks: ['jshint', 'concat', 'uglify']
      },
    },

    
  });
  
  /**
   * Default Task
   * run `grunt`
   */
  grunt.registerTask('default', [
    'jshint',           // JShint
    'concat:js',        // Concatenate main JS files
    'uglify',           // Minifiy concatenated JS file
  ]);

  /**
   * Production tast, use for deploying
   * run `grunt production`
   */
  grunt.registerTask('production', [
    'jshint',           // JShint
    'concat:js',        // Concatenate main JS files
    'uglify',           // Minifiy concatenated JS file
  ]);

  /**
   * Load the plugins specified in `package.json`
   */
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
};