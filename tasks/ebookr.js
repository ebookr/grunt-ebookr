/*
 * grunt-ebookr
 * https://github.com/ebookr/grunt-ebookr
 *
 * Copyright (c) 2014 Arne Hassel
 * Licensed under the MIT license.
 */

'use strict';

var ebookr = require('ebookr'),
    randomstring = require('randomstring'),
    util = require('util'),
    q = require('q');

module.exports = function(grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('ebookr', 'A Grunt plugin for ebookr', function() {
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: '\n\n'
    });

    // Iterate over all specified file groups.
    var taskOptions = this.options() || {};
    var promises = this.files.map(function(f) {
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });
      taskOptions.output = f.dest;
      if (!taskOptions.metadataFile) {
        if (grunt.file.exists('metadata.yaml')) {
          taskOptions.metadataFile = 'metadata.yaml';
        } else {
          grunt.log.debug('No manifest file given; might cause problems when converting to MOBI');
        }
      }
      var promise = ebookr.convertFile(src, taskOptions);
      promise.then(function (error, stdout, stderr) {
        if (taskOptions.verbose) {
          if (stdout) grunt.log.println(stdout);
          if (stderr) grunt.log.errorln(stderr);
        }
        grunt.log.writeln(util.format('%s created', f.dest))
      });
      return promise;
    });
    q.all(promises).then(function () {
      done();
    });
  });
};
