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
    '<rootDir>/tests/setupTestingLibrary.js',
  ],
  testEnvironment: 'jsdom',
  verbose: true,
};
