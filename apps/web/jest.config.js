/** @type {import('jest').Config} */
export default {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"],
  testMatch: ["<rootDir>/src/**/*.spec.ts"],
  moduleNameMapper: {
    "^@bookmarker/schemas$": "<rootDir>/../../packages/universal/schemas/src",
  },
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/main.ts",
    "!src/**/*.config.ts",
    "!src/**/*.routes.ts",
  ],
};
