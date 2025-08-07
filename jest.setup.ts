// Jest setup file for global test configuration

// Extend Jest matchers if needed
// import '@testing-library/jest-dom';

// Set longer timeout for integration tests if needed
if (process.env.TEST_TYPE === 'integration') {
  jest.setTimeout(30000);
} else {
  jest.setTimeout(5000);
}

// Global test utilities
global.testUtils = {
  // Helper to create mock data with defaults
  createMockData: <T>(defaults: T, overrides?: Partial<T>): T => ({
    ...defaults,
    ...overrides
  }),
  
  // Helper for async error testing
  expectAsyncError: async (
    promise: Promise<any>,
    errorMessage?: string
  ): Promise<void> => {
    await expect(promise).rejects.toThrow(errorMessage);
  }
};

// Declare global test utilities types
declare global {
  var testUtils: {
    createMockData: <T>(defaults: T, overrides?: Partial<T>) => T;
    expectAsyncError: (promise: Promise<any>, errorMessage?: string) => Promise<void>;
  };
}

// Suppress console errors in tests unless DEBUG is set
if (!process.env.DEBUG) {
  console.error = jest.fn();
  console.warn = jest.fn();
}