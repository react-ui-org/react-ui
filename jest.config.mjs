/** @type {import('jest').Config} */
export default {
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
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/tests/jest/setupFailOnConsole.ts',
    '<rootDir>/tests/jest/setupTestingLibrary.ts',
  ],
  testEnvironment: '@happy-dom/jest-environment',
  testMatch: [
    '**/*.test.{ts,tsx}',
  ],
  verbose: true,
};
