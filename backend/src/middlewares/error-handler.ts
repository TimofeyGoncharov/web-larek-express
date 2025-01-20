import { StatusCode } from "common/enums";
import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) =>
  res
    .status(err.statusCode || StatusCode.InternalServer)
    .json({ message: err.message });
