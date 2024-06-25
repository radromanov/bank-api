import { Router } from "express";
import { AuthController } from "./auth/auth.controller";

import { PostgresConfig } from "@config/postgres.config";

import { DrizzleClient, Postgres } from "@infrastructure/database";

import {
  DrizzleUserRepositoryImpl,
  NewUserUseCase,
  UserServiceImpl,
} from "@application/user";

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
