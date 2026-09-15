module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  collectCoverageFrom: ['server/**/*.js', '!server/**/*.test.js'],
  coverageDirectory: 'coverage',
};
