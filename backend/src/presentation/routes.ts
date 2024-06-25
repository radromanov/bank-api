import { Router } from "express";
import { AuthController } from "./auth/auth.controller";
import { DrizzleClient } from "@infrastructure/database/postgres/orms/drizzle/drizzle-client";
import { Postgres } from "@infrastructure/database/postgres/postgres";
import { PostgresConfig } from "@config/postgres.config";
import { DrizzleUserRepositoryImpl } from "@application/user/repositories/drizzle.user.repository.impl";
import { UserServiceImpl } from "@application/user/services/user.service.impl";
import { NewUserUseCase } from "@application/user/use-cases/new-user.use-case";

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
    const userRepository = new DrizzleUserRepositoryImpl(drizzleClient);
    const userService = new UserServiceImpl(userRepository);
    const newUserUseCase = new NewUserUseCase(userService);
    const authRoutes = new AuthController(newUserUseCase);

    return authRoutes.init();
  }
}
