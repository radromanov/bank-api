import { Router } from "express";

import { AuthController } from "./auth/auth.controller";
import { AuthRoutes } from "./auth/auth.routes";

import { PostgresConfig } from "@config/postgres.config";
import { RedisConfig } from "@config/redis.config";
import { NodemailerConfig } from "@config/nodemailer.config";

import { DrizzleClient, Postgres } from "@infrastructure/database";
import { RedisClient } from "@infrastructure/cache";
import { NodemailerClient } from "@infrastructure/email";

import {
  DrizzleUserRepositoryImpl,
  ExistingUserUseCase,
  FindUserUseCase,
  NewUserUseCase,
  UserServiceImpl,
} from "@application/user";

import {
  AuthServiceImpl,
  LoginUseCase,
  VerifyJWTUseCase,
  RefreshTokenUseCase,
} from "@application/auth";

import { EmailServiceImpl, SendEmailUseCase } from "@application/email";
import { AuthMiddleware } from "./auth/auth.middleware";

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
    const verifyJwtUseCase = new VerifyJWTUseCase(authService);
    const refreshTokenUseCase = new RefreshTokenUseCase(authService);

    const redisCache = new RedisClient(RedisConfig);

    const authController = new AuthController(
      newUserUseCase,
      findUserUseCase,
      existingUserUseCase,
      loginUseCase,
      redisCache,
      sendEmailUseCase
    );
    const authMiddleware = new AuthMiddleware(
      verifyJwtUseCase,
      refreshTokenUseCase
    );
    const authRoutes = new AuthRoutes(authController, authMiddleware);

    return authRoutes.init();
  }
}
