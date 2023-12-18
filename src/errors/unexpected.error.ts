import { ErrorInterface } from "./interface.error";

function UnexpectedError(message: string): ErrorInterface {
    const error: ErrorInterface = new Error(message) as ErrorInterface;
    error.name = 'UnexpectedError';
    error.statusCode = 500;
    Object.setPrototypeOf(error, UnexpectedError.prototype);
    return error;
}
  
export { UnexpectedError };
  