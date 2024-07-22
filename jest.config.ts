import { pathsToModuleNameMapper } from 'ts-jest'
import type { JestConfigWithTsJest } from 'ts-jest'

const paths = {
  "@src/*": [
    "src/*"
  ],
  "@config/*": [
    "src/config/*"
  ],
  "@entity/*": [
    "src/entity/*"
  ],
  "@errors/*": [
    "src/errors/*"
  ],
  "@midlewares/*": [
    "src/midlewares/*"
  ],
  "@migration/*": [
    "src/migration/*"
  ],
  "@modules/*": [
    "src/modules/*"
  ],
  "@routes/*": [
    "src/routes/*"
  ],
}

const jestConfig: JestConfigWithTsJest = {
  verbose: true,

  testEnvironment: "node",
  preset: "ts-jest",
  roots: ['.'],
  modulePaths: ["."],
  testTimeout: 10000,
  moduleNameMapper: pathsToModuleNameMapper(paths),

  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  watchPathIgnorePatterns: ["/node_modules/"],
};

export default jestConfig;