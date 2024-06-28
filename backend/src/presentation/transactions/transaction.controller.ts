import { Request, Response } from "express";

export class TransactionController {
  constructor() {}

  handleCreateOne = async (req: Request, res: Response) => {
    const payload = req.body;

    res.status(201).json(payload);
  };
}
