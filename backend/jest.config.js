const { defaults: tsjPreset } = require("ts-jest/presets");

/** @type {import('jest').Config} */
const config = {
  collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/src/main/**/*.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  transform: {
    ...tsjPreset.transform,
  },
  preset: "@shelf/jest-postgres",
  moduleNameMapper: {
    "@domain/(.*)": "<rootDir>/src/domain/$1",
    "@api/(.*)": "<rootDir>/src/api/$1",
    "@application/(.*)": "<rootDir>/src/application/$1",
    "@infrastructure/(.*)": "<rootDir>/src/infrastructure/$1",
    "@utils/(.*)": "<rootDir>/src/utils/$1",
    "@main/(.*)": "<rootDir>/src/main/$1",
    "@tests/(.*)": "<rootDir>/src/tests/$1",
  },
  roots: ["<rootDir>/tests/"],
};

module.exports = config;
