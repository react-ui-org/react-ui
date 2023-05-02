module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
  },
  modulePathIgnorePatterns: ['<rootDir>/.docz/'],
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/tests/setupJest.ts'],
  setupFilesAfterEnv: ['<rootDir>/tests/setupTestingLibrary.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  verbose: true,
};