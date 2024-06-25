import { Router } from "express";
import { AuthController } from "./auth.controller";

export class AuthRoutes {
  private router: Router;

  constructor(private readonly authController: AuthController) {
    this.router = Router();
  }

  init() {
    this.router.post("/register", this.authController.handleRegister);

    return this.router;
  }
}
