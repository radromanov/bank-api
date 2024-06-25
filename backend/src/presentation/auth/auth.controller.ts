import { NewUserDTO } from "@application/user/dtos/new-user.dto";
import { NewUserUseCase } from "@application/user/use-cases/new-user.use-case";
import { ApiError } from "@shared/utils/api-error";
import { Router } from "express";

export class AuthController {
  private router: Router;

  constructor(private readonly newCustomer: NewUserUseCase) {
    this.router = Router();
  }

  init() {
    this.router.post("/register", async (req, res) => {
      console.log("in here");

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
