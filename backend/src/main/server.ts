import express from "express";
import { BankApiConfig } from "@infrastructure/config/bank-api.config";

const app = express();

const { port, env } = BankApiConfig.get();

app.listen(port, () => {
  console.log(`Server running on port ${port} in ${env} mode.`);
});
