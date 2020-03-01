module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
  },
  setupFiles: [
    '<rootDir>/tests/setupJest.js',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/tests/setupEnzyme.js',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  verbose: true,
};
