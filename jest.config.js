module.exports = {
  moduleFileExtensions: [
    // Jest runner requires `js` extension to be defined
    'js',
    'ts',
    'tsx',
  ],
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/tests/jest/mocks/svgrMock.ts',
  },
  setupFiles: [
    '<rootDir>/tests/jest/setupJest.ts',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/tests/jest/setupTestingLibrary.ts',
  ],
  testEnvironment: '@happy-dom/jest-environment',
  testMatch: [
    '**/*.test.{ts,tsx}',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-ui-org))',
  ],
  verbose: true,
};
