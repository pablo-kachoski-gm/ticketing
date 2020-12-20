import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error connecting to Database";
  constructor() {
    super("Error connecting to Database");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors = () => [{ message: this.reason }];
}