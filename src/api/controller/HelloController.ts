import { Request, Response } from "express";

export class HelloController {
  async getHello(_req: Request, res: Response): Promise<void> {
    res.send({
      message: "hello queque",
    });
  }
}
