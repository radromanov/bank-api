const TRANSACTIONS_ROOT = "transactions";

export default {
  version: "v1",
  routes: {
    transaction: {
      index: TRANSACTIONS_ROOT,
      getAll: `/${TRANSACTIONS_ROOT}`,
      getOne: `/${TRANSACTIONS_ROOT}/:id`,
    },
  },
};
