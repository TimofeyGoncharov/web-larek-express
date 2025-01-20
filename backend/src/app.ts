import express from "express";
import mongoose from "mongoose";
import path from "path";
import { errors } from "celebrate";
import cors from "cors";
import { productRouter } from "./routes/products";
import { orderRouter } from "./routes/orders";
import { errorHandler } from "./middlewares/error-handler";
import { errorLogger, requestLogger } from "./middlewares/logger";

const { PORT = 3000, DB_ADDRESS = "mongodb://127.0.0.1:27017/weblarek" } =
  process.env;

const app = express();

app.use(cors());
app.use(express.json());

app.use(requestLogger);
app.use("/product", productRouter);
app.use("/order", orderRouter);

app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(DB_ADDRESS);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
