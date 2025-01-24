import { Request, Response, NextFunction } from "express";
import { Error as MongooseError } from "mongoose";
import Product from "../models/product";
import { BadRequestError } from "../errors/bad-request-error";
import { StatusCode } from "common/enums";
import { ConflictError } from "errors/conflict-error";

export const getAll = (_req: Request, res: Response, next: NextFunction) =>
  Product.find({})
    .then((data) => res.send({ items: data, total: data.length }))
    .catch((error) => {
      if (error instanceof MongooseError.ValidationError) {
        return next(
          new BadRequestError(`Ошибка полуения товаров - ${error.message}`)
        );
      }
      return next(
        new BadRequestError(`Ошибка полуения товаров - ${error.message}`)
      );
    });

export const create = async (req: Request, res: Response, next: NextFunction) =>
  Product.create(req.body)
    .then((product) => {
      res.status(StatusCode.Created).send({ item: product });
    })
    .catch((error) => {
      if (error instanceof Error && error.message.includes("E11000")) {
        return next(new ConflictError(error.message));
      }
      if (error instanceof MongooseError.ValidationError) {
        return next(
          new BadRequestError(`Ошибка полуения товаров - ${error.message}`)
        );
      }
      return next(
        new BadRequestError(`Ошибка создания продукта - ${error.message}`)
      );
    });
