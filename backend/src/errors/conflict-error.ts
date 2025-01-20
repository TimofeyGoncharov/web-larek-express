import { StatusCode } from "common/enums";

export class ConflictError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCode.Conflict;
  }
}
