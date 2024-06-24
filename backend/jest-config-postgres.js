import cwd from "cwd";

module.exports = {
  seedPath: `${cwd()}/src/infrastructure/database/seed.ts`,
  version: 16,
  port: 5555,
};
