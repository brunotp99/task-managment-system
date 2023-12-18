import { ErrorInterface } from "./interface.error";
  
function NotFoundError(message: string): ErrorInterface {
    const error: ErrorInterface = new Error(message) as ErrorInterface;
    error.name = 'NotFoundError';
    error.statusCode = 404;
    Object.setPrototypeOf(error, NotFoundError.prototype);
    return error;
}
  
 export { NotFoundError };
  