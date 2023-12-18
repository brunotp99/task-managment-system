import { ErrorInterface } from "./interface.error";

function InvalidEnumError(message: string): ErrorInterface {
    const error: ErrorInterface = new Error(message) as ErrorInterface;
    error.name = 'InvalidEnumError';
    error.statusCode = 400;
    Object.setPrototypeOf(error, InvalidEnumError.prototype);
    return error;
}
  
export { InvalidEnumError };
  