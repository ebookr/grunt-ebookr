module.exports = {
  singleFile: {
    src: ['test/fixtures/1.md'],
    dest: 'test/output/1.html'
  },
  multipleFiles: {
  	src: ['test/fixtures/1.md', 'test/fixtures/2.md'],
  	dest: 'test/output/2.html'
  },
  withExtensions: {
    options: {
      metadataFile: 'test/fixtures/metadata.yaml',
      extensions: ['status']
    },
    src: ['test/fixtures/status.md'],
    dest: 'test/output/status.html'
  },
  withMetadata: {
  	options: {
  		metadataFile: 'test/fixtures/metadata.yaml',
      metadata: {
        title: 'TESTING'
      }
  	},
    src: ['test/fixtures/1.md', 'test/fixtures/2.md'],
    dest: 'test/output/3.html'
  }
};