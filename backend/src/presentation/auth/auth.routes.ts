import { Router } from "express";
import { AuthController } from "./auth.controller";
import { catcher } from "@shared/utils/catcher";

export class AuthRoutes {
  private router: Router;

  constructor(private readonly authController: AuthController) {
    this.router = Router();
  }

  init() {
    this.router.post("/register", catcher(this.authController.handleRegister));
    this.router.post("/login", catcher(this.authController.handleLogin));
    this.router.get("/", catcher(this.authController.handleFindOne));

    return this.router;
  }
}
