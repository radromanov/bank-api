import { Request, Response } from "express";
import { NewUserDTO, NewUserUseCase } from "@application/user";
import { ApiError } from "@shared/utils/api-error";

export class AuthController {
  constructor(private readonly newCustomer: NewUserUseCase) {}

  handleRegister = async (req: Request, res: Response) => {
    const dto = NewUserDTO.create(req.body);

    try {
      await this.newCustomer.createOne(dto);
      res.status(201).json(dto);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      } else {
        res
          .status(500)
          .json({ error: "Something went wrong. Please, try again." });
      }
    }
  };
}
