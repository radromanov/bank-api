import { Router } from "express";
import { AuthController } from "./auth/auth.controller";
import { NewCustomerUseCase } from "@application/customer/use-cases/new-customer.use-case";
import { CustomerServiceImpl } from "@application/customer/services/customer.service.impl";
import { DrizzleCustomerRepositoryImpl } from "@application/customer/repositories/drizzle.customer.repository.impl";
import { DrizzleClient } from "@infrastructure/database/postgres/orms/drizzle/drizzle-client";
import { Postgres } from "@infrastructure/database/postgres/postgres";
import { PostgresConfig } from "@config/postgres.config";

export class AppRoutes {
  private routes: Router;

  constructor() {
    this.routes = Router();
  }

  init() {
    const authRouter = this.authRoutes();

    this.routes.use("/auth", authRouter);

    return this.routes;
  }

  private authRoutes() {
    const sql = new Postgres(PostgresConfig).sql;
    const drizzleClient = new DrizzleClient(sql).client;
    const customerRepository = new DrizzleCustomerRepositoryImpl(drizzleClient);
    const customerService = new CustomerServiceImpl(customerRepository);
    const newCustomerUseCase = new NewCustomerUseCase(customerService);
    const authRoutes = new AuthController(newCustomerUseCase);

    return authRoutes.init();
  }
}
