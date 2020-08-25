import { CustomError } from './customError';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error connection to DB';

  constructor() {
    super('Invalid request');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
