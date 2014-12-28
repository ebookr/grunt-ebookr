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
    var promises = this.files.map(function(f) {
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));
      var converted = ebookr.parse(src).render();
      var tmpFilePath = util.format("./%s.md", randomstring.generate());
      grunt.file.write(tmpFilePath, converted);
      var promise = ebookr.pandoc.convert(tmpFilePath, { output: f.dest });
      promise.then(function () {
        grunt.file.delete(tmpFilePath);
      });
      return promise;
    });
    q.all(promises).then(function () {
      done();
    });
  });
};
