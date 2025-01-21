import { Request, Response, NextFunction } from "express";
import { faker } from "@faker-js/faker";
import Product from "../models/product";
import { BadRequestError } from "../errors/bad-request-error";
import { StatusCode } from "common/enums";

const { ObjectId } = require("mongoose").Types;

const create = async (req: Request, res: Response, next: NextFunction) => {
  const { total, items } = req.body;
  const id = faker.string.uuid();
  let totalDb = 0;

  await Promise.allSettled(
    items.map(async (itemId: string) => {
      const product = await Product.findById({ _id: new ObjectId(itemId) });
      if (!product) {
        return next(
          new BadRequestError(
            `Ошибка! Товар с индентификатором - ${itemId} не найден`
          )
        );
      }
      if (product.price === null) {
        return next(
          new BadRequestError(
            `Ошибка! Не указана цена товара. Индентификатор - ${itemId}`
          )
        );
      }
      totalDb += product.price;
      return totalDb;
    })
  )
    .then(() => {
      console.log(total);
      console.log(totalDb);
      if (total !== totalDb) {
        return next(
          new BadRequestError("Ошибка! Не совпадает итоговая стоимость товаров")
        );
      }
      return res.status(StatusCode.Created).send({ id, total: totalDb });
    })
    .catch((error) => next(new BadRequestError(error)));
};

export default create;
