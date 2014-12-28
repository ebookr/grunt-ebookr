module.exports = {
  singleFile: {
    src: ['test/fixtures/1.md'],
    dest: 'test/output/1.html'
  },
  multipleFiles: {
  	src: ['test/fixtures/1.md', 'test/fixtures/2.md'],
  	dest: 'test/output/2.html'
  }
};