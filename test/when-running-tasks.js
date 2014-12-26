'use strict';

var expect = require('chai').expect;

describe('When running tasks', function () {
  var grunt = require('grunt');

  it('should support default options', function () {
    var actual = grunt.file.read('tmp/default_options');
    var expected = grunt.file.read('test/expected/default_options');
    expect(actual).to.eql(expected);
  });

  it('should support custom options', function () {
    var actual = grunt.file.read('tmp/custom_options');
    var expected = grunt.file.read('test/expected/custom_options');
    expect(actual).to.eql(expected);
  });
});