import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  // testMatch: [
  //   '**/__tests__/**/*.+(ts|tsx|js)',
  //   '**/?(*.)+(spec|test).+(ts|tsx|js)',
  // ],
  // transform: {
  //   '^.+\\.(ts|tsx)$': 'ts-jest',
  // },
};

// module.exports = {
//   //   roots: ['<rootDir>/src'],

// };
export default config;
