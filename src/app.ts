import express, { Application, Request, Response } from "express";
export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./router/index"));

app.get("/", (_req: Request, res: Response) => {
  return res.status(200).send({
    message: "Hello queque",
  });
});
