import { Request, Response } from "express";
import { FindUserUseCase, NewUserDTO, NewUserUseCase } from "@application/user";
import { ApiError } from "@shared/utils/api-error";
import { email, id } from "@shared/utils/zod";

export class AuthController {
  constructor(
    private readonly newUser: NewUserUseCase,
    private readonly findUser: FindUserUseCase
  ) {}

  handleRegister = async (req: Request, res: Response) => {
    const dto = NewUserDTO.create(req.body);

    await this.newUser.createOne(dto);

    res.status(201).json(dto);
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

  handleLogin = async (_req: Request, _res: Response) => {};

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
    const validEmail = email.safeParse(req.query.email);

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
