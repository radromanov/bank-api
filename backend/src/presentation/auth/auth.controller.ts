import { NewCustomerDTO } from "@application/customer/dtos/new-customer.dto";
import { NewCustomerUseCase } from "@application/customer/use-cases/new-customer.use-case";
import { ApiError } from "@shared/utils/api-error";
import { Router } from "express";

export class AuthController {
  private router: Router;

  constructor(private readonly newCustomer: NewCustomerUseCase) {
    this.router = Router();
  }

  init() {
    this.router.post("/register", async (req, res) => {
      console.log("in here");

      const dto = NewCustomerDTO.create(req.body);

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
