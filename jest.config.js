module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
  ],
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/tests/jest/mocks/svgrMock.jsx',
  },
  setupFiles: [
    '<rootDir>/tests/jest/setupJest.js',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/tests/jest/setupTestingLibrary.js',
  ],
  testEnvironment: '@happy-dom/jest-environment',
  testMatch: [
    '**/*.test.{js,jsx,ts,tsx}',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-ui-org))',
  ],
  verbose: true,
};
