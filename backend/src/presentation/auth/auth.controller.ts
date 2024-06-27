import { Request, Response } from "express";
import { FindUserUseCase, NewUserDTO, NewUserUseCase } from "@application/user";
import { ApiError } from "@shared/utils/api-error";
import { email, id } from "@shared/utils/zod";
import { LoginDTO, LoginUseCase } from "@application/auth";
import { BankApiConfig } from "@config/bank-api.config";
import { CacheClient } from "@infrastructure/cache/cache.client";
import { ExistingUserUseCase } from "@application/user/use-cases/existing-user.use-case";
import { SendEmailDTO, SendEmailUseCase } from "@application/email";

interface Cached {
  otp: string;
  user: NewUserDTO;
}

export class AuthController {
  constructor(
    private readonly newUser: NewUserUseCase,
    private readonly findUser: FindUserUseCase,
    private readonly existingUser: ExistingUserUseCase,
    private readonly loginUser: LoginUseCase,
    private readonly cache: CacheClient,
    private readonly sendEmail: SendEmailUseCase
  ) {}

  handleRegister = async (req: Request, res: Response) => {
    const dto = NewUserDTO.create(req.body);

    const isExists = await this.existingUser.execute(dto.email);
    if (isExists) throw ApiError.CONFLICT("User already exists");

    const key = this.cache.createKey(dto.email);
    const otp = this.cache.createOtp();
    await this.cache.set(key, { otp, user: dto });

    const emailDto = SendEmailDTO.create({
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
    const dto = LoginDTO.create(req.body);
    const { accessToken, refreshToken } = await this.loginUser.execute(dto);

    const env = BankApiConfig.getOne("env");

    res
      .status(200)
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: env === "production" ? true : false, // Allows for easier testing in Postman
        sameSite: "strict",
        maxAge: 604800, // 7 days
      })
      .send({ accessToken });
  };

  handleVerify = async (
    req: Request<{}, {}, { otp: string | null; token: string | null }>,
    res: Response
  ) => {
    const { otp, token } = req.body;
    if (!otp || !token) {
      throw ApiError.BAD_REQUEST("Missing or invalid verification payload");
    }

    const cached = await this.cache.get<Cached>(token);
    if (!cached || cached.otp !== otp) {
      throw ApiError.NOT_FOUND(); // Error is 404 (generic) in order to prevent narrowing
    }

    await this.cache.del(token);
    await this.newUser.createOne(cached.user);

    res.sendStatus(201); // Created user
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
