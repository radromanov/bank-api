import { Router } from "express";
import { AuthController } from "./auth.controller";
import { catcher } from "@shared/utils";
import { AuthMiddleware } from "./auth.middleware";

export class AuthRoutes {
  private router: Router;

  constructor(
    private readonly authController: AuthController,
    private readonly authMiddleware: AuthMiddleware
  ) {
    this.router = Router();
  }

  init() {
    this.router.post("/register", catcher(this.authController.handleRegister));
    this.router.post("/login", catcher(this.authController.handleLogin));
    this.router.post("/verify", catcher(this.authController.handleVerify));
    this.router.get("/", catcher(this.authController.handleFindOne));
    this.router.get(
      "/me",
      this.authMiddleware.isAuthed,
      catcher(this.authController.handleMe)
    );

    return this.router;
  }
}
