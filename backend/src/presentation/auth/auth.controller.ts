import { Router } from "express";
import { ApiError } from "@shared/utils/api-error";
import { NewUserDTO, NewUserUseCase } from "@application/user";

export class AuthController {
  private router: Router;

  constructor(private readonly newCustomer: NewUserUseCase) {
    this.router = Router();
  }

  init() {
    this.router.post("/register", async (req, res) => {
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
    });

    return this.router;
  }
}
