import { StatusCode } from "common/enums";

export class NotFoundError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCode.Conflict;
  }
}
