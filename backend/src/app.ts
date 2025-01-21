import express from "express";
import mongoose from "mongoose";
import path from "path";
import { errors } from "celebrate";
import cors from "cors";
import { productRouter } from "./routes/products";
import { orderRouter } from "./routes/orders";
import { errorHandler } from "./middlewares/error-handler";
import { errorLogger, requestLogger } from "./middlewares/logger";
import { rateLimit } from "express-rate-limit";
import { StatusCode } from "common/enums";

const { PORT = 3000, DB_ADDRESS = "mongodb://127.0.0.1:27017/weblarek" } =
  process.env;

const app = express();
const limited = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

app.use(limited);
app.use(cors());
app.use(express.json());

app.use(requestLogger);
app.use("/product", productRouter);
app.use("/order", orderRouter);

app.use("*", (req, res) => {
  res
    .status(StatusCode.NotFound)
    .send({ message: "Запрашиваемый ресурс не найден" });
});

app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(DB_ADDRESS);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
