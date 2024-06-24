const TRANSACTIONS_ROOT = "transactions";
const AUTH_ROOT = "auth";

export default {
  version: "v1",
  routes: {
    transaction: {
      root: TRANSACTIONS_ROOT,
      getAll: `/${TRANSACTIONS_ROOT}`,
      getOne: `/${TRANSACTIONS_ROOT}/:id`,
    },
    auth: {
      root: AUTH_ROOT,
      register: `/${AUTH_ROOT}/register`,
      login: `/${AUTH_ROOT}/login`,
    },
  },
};
