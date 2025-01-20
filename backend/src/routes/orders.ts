import { Router } from "express";
import { celebrate, Segments } from "celebrate";
import create from "../controllers/orders";
import { orderSchema } from "../middlewares/validations";

const validateOrderBody = celebrate({
  [Segments.BODY]: orderSchema,
});

export const orderRouter = Router();

orderRouter.post("/", validateOrderBody, create);
