import { Request, Response } from "express";
import { NewUserDTO, NewUserUseCase } from "@application/user";

export class AuthController {
  constructor(private readonly newCustomer: NewUserUseCase) {}

  handleRegister = async (req: Request, res: Response) => {
    const dto = NewUserDTO.create(req.body);

    await this.newCustomer.createOne(dto);

    res.status(201).json(dto);
  };
}
