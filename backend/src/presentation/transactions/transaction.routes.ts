import { Router } from "express";
import { TransactionController } from "./transaction.controller";
import { catcher } from "@shared/utils";
import { AuthMiddleware } from "@presentation/auth/auth.middleware";

export class TransactionRoutes {
  private router: Router;

  constructor(
    private readonly transactionController: TransactionController,
    private readonly authMiddleware: AuthMiddleware
  ) {
    this.router = Router();
  }

  init() {
    this.router.post(
      "/",
      this.authMiddleware.isAuthed,
      catcher(this.transactionController.handleCreateOne)
    );

    return this.router;
  }
}
