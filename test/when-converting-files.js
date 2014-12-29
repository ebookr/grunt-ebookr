'use strict';

var expect = require('chai').expect,
    exec = require('child_process').exec;

describe('When converting files', function () {
  var grunt = require('grunt');

  it('should convert single file', function (done) {
    exec('grunt ebookr:singleFile', function (error, stdout, stderr) {
      var actual = grunt.file.read('./test/output/1.html');
      var expected = grunt.file.read('./test/expected/1.html');
      expect(actual).to.eql(expected);
      grunt.file.delete('./test/output/1.html');
      done();
    });
  });

  it('should convert multiple files', function (done) {
    exec('grunt ebookr:multipleFiles', function (error, stdout, stderr) {
      var actual = grunt.file.read('./test/output/2.html');
      var expected = grunt.file.read('./test/expected/2.html');
      expect(actual).to.eql(expected);
      grunt.file.delete('./test/output/2.html');
      done();
    });
  });

  it('should support metadata', function (done) {
    exec('grunt ebookr:withMetadata', function (error, stdout, stderr) {
      var actual = grunt.file.read('./test/output/3.html');
      var expected = grunt.file.read('./test/expected/3.html');
      expect(actual).to.eql(expected);
      grunt.file.delete('./test/output/3.html');
      done();
    });
  });
});