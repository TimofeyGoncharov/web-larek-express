import { Router } from "express";
import { celebrate, Segments } from "celebrate";
import { create, getAll } from "../controllers/products";
import { productSchema } from "../middlewares/validations";

const validateProductBody = celebrate({
  [Segments.BODY]: productSchema,
});

export const productRouter = Router();
productRouter.get("/", getAll);
productRouter.post("/", validateProductBody, create);
