import { Request, Response } from "express";

import { BankApiConfig } from "@config/bank-api.config";

import { ApiError, email, id } from "@shared/utils";

import { Cached } from "@shared/types";

import { CacheClient } from "@infrastructure/cache";

import { RegisterMapper } from "@infrastructure/auth";

import { UserEntity } from "@infrastructure/user";

import { ExistingUserUseCase, FindUserUseCase } from "@application/user";

import { RegisterUseCase, LoginUseCase } from "@application/auth";

import { SendEmailUseCase } from "@application/email";

import { LoginDto, VerifyDto } from "@domain/auth";

import { SendEmailDto } from "@domain/email";

export class AuthController {
  constructor(
    private readonly register: RegisterUseCase,
    private readonly findUser: FindUserUseCase,
    private readonly existingUser: ExistingUserUseCase,
    private readonly login: LoginUseCase,
    private readonly cache: CacheClient,
    private readonly sendEmail: SendEmailUseCase
  ) {}

  handleRegister = async (req: Request, res: Response) => {
    if (!req.body.email) {
      throw ApiError.BAD_REQUEST();
    }

    const isExists = await this.existingUser.execute(req.body.email);
    if (isExists) throw ApiError.CONFLICT("User already exists");

    const entity = new UserEntity(
      req.body.email,
      req.body.firstName,
      req.body.lastName
    );
    const dto = RegisterMapper.fromEntity(entity);

    const key = this.cache.createKey(dto.email);
    const otp = this.cache.createOtp();
    await this.cache.set(key, { otp, user: dto, type: "register" });

    const emailDto = SendEmailDto.create({
      sender: "bank@api.com",
      recipient: dto.email,
      subject: "Verify Your Account | Bank API",
      body: `Your one-time password is ${otp}.`,
    });

    await this.sendEmail.execute(emailDto);

    res.status(200).json(key);
  };

  handleFindOne = async (req: Request, res: Response) => {
    if ("id" in req.query) {
      await this.handleFindOneById(req, res);
    } else if ("email" in req.query) {
      await this.handleFindOneByEmail(req, res);
    } else {
      throw ApiError.NOT_FOUND();
    }
  };

  handleLogin = async (req: Request, res: Response) => {
    const dto = LoginDto.create(req.body);

    const isExists = await this.existingUser.execute(dto.email);
    if (!isExists) throw ApiError.UNAUTHORIZED("Incorrect or invalid email");

    const key = this.cache.createKey(dto.email);
    const otp = this.cache.createOtp();
    await this.cache.set(key, { otp, user: dto, type: "login" });

    const emailDto = SendEmailDto.create({
      sender: "bank@api.com",
      recipient: dto.email,
      subject: "Verify Your Account | Bank API",
      body: `Your one-time password is ${otp}.`,
    });

    await this.sendEmail.execute(emailDto);

    res.status(200).json(key);
  };

  handleVerify = async (
    req: Request<{}, {}, { otp: string | null; token: string | null }>,
    res: Response
  ) => {
    const dto = VerifyDto.create(req.body);

    const cached = await this.cache.get<Cached>(dto.token);
    if (!cached || cached.otp !== dto.otp) {
      throw ApiError.NOT_FOUND(); // Error is 404 (generic) in order to prevent narrowing
    }

    await this.cache.del(dto.token);

    if (cached.type === "register") {
      await this.register.execute(cached.user);
      res.sendStatus(201); // Created user
    } else if (cached.type === "login") {
      const loginDto = LoginDto.create(cached.user);
      const { access, refresh } = await this.login.execute(loginDto);

      const env = BankApiConfig.getOne("env");

      res
        .status(200)
        .cookie("refresh_token", refresh, {
          httpOnly: true,
          secure: env === "production" ? true : false, // Allows for easier testing in Postman
          sameSite: "strict",
          maxAge: 604800, // 7 days
        })
        .send({ accessToken: access });
    } else {
      throw ApiError.BAD_REQUEST("Unable to verify");
    }
  };

  handleMe = async (_req: Request, res: Response) => {
    res.sendStatus(200);
  };

  private handleFindOneById = async (req: Request, res: Response) => {
    const validId = id().safeParse(req.query.id);

    if (!validId.success) {
      throw ApiError.BAD_REQUEST(
        validId.error.errors[0].message || "Invalid 'id' query in request url."
      );
    }

    const user = await this.findUser.findById(validId.data);
    res.status(200).json(user);
  };

  private handleFindOneByEmail = async (req: Request, res: Response) => {
    const validEmail = email("Email").safeParse(req.query.email);

    if (!validEmail.success) {
      throw ApiError.BAD_REQUEST(
        validEmail.error.errors[0].message ||
          "Invalid 'email' query in request url"
      );
    }

    const user = await this.findUser.findByEmail(validEmail.data);
    res.status(200).json(user);
  };
}
