import { Router } from "express";

import { AuthRoutes, AuthMiddleware, AuthController } from "./auth";
import { TransactionRoutes, TransactionController } from "./transactions";

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

export class AppRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  init() {
    const { auth, transactions } = this.routes();

    this.router.use("/auth", auth);
    this.router.use("/transactions", transactions);

    return this.router;
  }

  private routes() {
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
    const transactionController = new TransactionController();

    const authMiddleware = new AuthMiddleware(
      verifyJwtUseCase,
      refreshTokenUseCase
    );

    const authRoutes = new AuthRoutes(authController, authMiddleware);
    const transactionRoutes = new TransactionRoutes(
      transactionController,
      authMiddleware
    );

    return { auth: authRoutes.init(), transactions: transactionRoutes.init() };
  }
}
