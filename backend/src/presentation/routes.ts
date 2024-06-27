import { Router } from "express";

import { AuthController } from "./auth/auth.controller";
import { AuthRoutes } from "./auth/auth.routes";

import { PostgresConfig } from "@config/postgres.config";

import { DrizzleClient, Postgres } from "@infrastructure/database";

import {
  DrizzleUserRepositoryImpl,
  FindUserUseCase,
  NewUserUseCase,
  UserServiceImpl,
} from "@application/user";
import { AuthServiceImpl, LoginUseCase } from "@application/auth";
import { RedisClient } from "@infrastructure/cache/redis/redis.client";
import { RedisConfig } from "@config/redis.config";
import { ExistingUserUseCase } from "@application/user/use-cases/existing-user.use-case";
import { EmailServiceImpl, SendEmailUseCase } from "@application/email";
import { NodemailerClient } from "@infrastructure/email";
import { NodemailerConfig } from "@config/nodemailer.config";

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
    const findUserUseCase = new FindUserUseCase(userService);
    const existingUserUseCase = new ExistingUserUseCase(userService);

    const emailClient = new NodemailerClient(NodemailerConfig);
    const emailService = new EmailServiceImpl(emailClient);
    const sendEmailUseCase = new SendEmailUseCase(emailService);

    const authService = new AuthServiceImpl(findUserUseCase);
    const loginUseCase = new LoginUseCase(authService);

    const redisCache = new RedisClient(RedisConfig);

    const authController = new AuthController(
      newUserUseCase,
      findUserUseCase,
      existingUserUseCase,
      loginUseCase,
      redisCache,
      sendEmailUseCase
    );
    const authRoutes = new AuthRoutes(authController);

    return authRoutes.init();
  }
}
