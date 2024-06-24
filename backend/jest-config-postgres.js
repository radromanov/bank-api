import cwd from "cwd";

module.exports = {
  seedPath: `${cwd()}/test/seed.sql`,
  version: 16,
  port: 5555,
};
