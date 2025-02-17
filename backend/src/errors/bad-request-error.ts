import { StatusCode } from "common/enums";

export class BadRequestError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCode.BadRequest;
  }
}
