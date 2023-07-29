/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['./**/*.test.ts'],
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^~/package.json': '<rootDir>/package.json',
    '^~/(.*)$': '<rootDir>/src/$1',
  },
};
