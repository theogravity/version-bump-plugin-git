module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  testResultsProcessor: './node_modules/jest-junit-reporter',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/build',
    '/node_modules/'
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 90,
      functions: 50,
      lines: 80
    }
  }
}
