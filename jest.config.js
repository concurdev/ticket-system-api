module.exports = {
  testMatch: [
    "<rootDir>/test/*.test.ts"
  ],
  transform: {
    '^.+\\.tsx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(@babel)/)"
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  setupFiles: [
    "<rootDir>/test/setup.js"
  ]
};
