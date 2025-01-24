import { Joi } from "celebrate";

export const productSchema = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  image: Joi.object().required().keys({
    fileName: Joi.string().required(),
    originalName: Joi.string().required(),
  }),
  category: Joi.string().min(2).max(30).required(),
  description: Joi.string().min(2).max(100).required(),
  price: Joi.number(),
});

export const orderSchema = Joi.object({
  payment: Joi.string().valid("card", "online").required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i)
    .required(),
  address: Joi.string().required(),
  total: Joi.number().min(1).required(),
  items: Joi.array().items(Joi.string()).required(),
});
