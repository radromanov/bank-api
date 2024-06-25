import express, { Express } from "express";
import cookieParser from "cookie-parser";

import { BankApiConfig } from "@config/bank-api.config";
import { AppRoutes } from "./routes";
import { globalError } from "./global-error";

export class Server {
  constructor(private readonly app: Express) {}

  private setup() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(cookieParser());
  }

  routes() {
    this.setup();

    const router = new AppRoutes().init();

    this.app.use("/api/v1", router);
    this.app.use(globalError);

    return this.app;
  }

  listen() {
    const { port, env } = BankApiConfig.get();

    return this.app.listen(port, () =>
      console.log(`Express server running on port ${port} in ${env} mode.`)
    );
  }
}
