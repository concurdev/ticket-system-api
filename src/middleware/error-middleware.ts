import createError from 'http-errors';
import { Log } from '../utils/logger';

class ErrorMiddleware {
  /**
   * Handle errors and send appropriate responses.
   * @param error - The error object.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next middleware function.
   */
  public handleError = async (error: any, req: any, res: any, next: any): Promise<void> => {
    if (error instanceof createError.HttpError) {
      // Handle HttpError
      Log.warn(`errorMiddleware HttpError: ${error}`);
      res.status(error.statusCode).json({ message: error.message });
    } else {
      // Handle Internal Server Error
      Log.error(`errorMiddleware Internal Server Error: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }

    next();
  };
}

export default new ErrorMiddleware();
