const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // "@/components/*": ["components/*"]
    // '^@/components/(.*)$': '<rootDir>/components/$1',

    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@hooks': '<rootDir>/src/hooks',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^@constants': '<rootDir>/src/constants',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@database/(.*)$': '<rootDir>/src/database/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@templates/(.*)$': '<rootDir>/src/templates/$1',
    '^@layouts/(.*)$': '<rootDir>/src/layouts/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@UI/(.*)$': '<rootDir>/src/UI/$1',
    '^@utils': '<rootDir>/src/utils',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@public/(.*)$': '<rootDir>/src/../public/$1',
    '^@routes': '<rootDir>/src/routes',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
