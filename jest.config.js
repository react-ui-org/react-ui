module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/.docz/',
  ],
  setupFiles: [
    '<rootDir>/tests/setupJest.js',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/tests/setupEnzyme.js',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  testEnvironment: 'jsdom',
  verbose: true,
};
