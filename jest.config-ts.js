
 module.exports = {
  extensionsToTreatAsEsm: [
    '.ts',
    '.tsx',
  ],
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
  preset: 'ts-jest',
  setupFiles: [
    '<rootDir>/tests/jest/setupJest.js',
  ],
  setupFilesAfterEnv: [
  ],
  testEnvironment: '@happy-dom/jest-environment',
  testMatch: [
    '**/*.test.{ts,tsx}',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      { useESM: true },
    ],
  },
  verbose: true,
};
