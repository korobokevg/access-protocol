require("dotenv").config();
import express, { RequestHandler } from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import authRoute from "./routes/auth";
import articleRoute from "./routes/articles";
import { redisClient } from "./utils/redis";

export const run = async () => {
  await redisClient.connect();

  const app = express();

  app.set("trust proxy", true);
  app.use(express.json() as RequestHandler);
  app.use(bodyParser.urlencoded({ extended: true }) as RequestHandler);

  app.use("/auth", authRoute);
  app.use("/article", articleRoute);

  app.use(helmet() as RequestHandler);

  app.get("/", (req, res) => {
    res.send({ succes: true, message: "visit https://bonfida.org" });
  });

  app.listen(3000);
};
