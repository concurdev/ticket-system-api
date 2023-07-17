import { Log } from '../utils/logger';

class TicketController {
  /**
   * Get all tickets.
   */
  public getAllTickets = async (req: any, res: any, next: any): Promise<void> => {
    try {
      Log.info('getAllTickets controller reached');

      const { count } = res.locals.data;

      // Send the response with the appropriate status code and data
      res.status(res.locals.statusCode).send(res.locals);

      Log.info(`getAllTickets controller exiting. Total ticket count: ${count}`);
    } catch (error) {
      this.handleControllerError(error, req, res, next, 'getAllTickets');
    }
  };

  /**
   * Insert a new ticket.
   */
  public insertTicket = async (req: any, res: any, next: any): Promise<void> => {
    try {
      Log.info('insertTicket controller reached');

      // Send the response with the appropriate status code and data
      res.status(res.locals.statusCode).send(res.locals);

      // Log an info message about the ticket creation
      let infoMessage = 'insertTicket controller exiting. ';
      infoMessage += !req.body.client ? `Randomly "${res.locals.client}" was chosen` : '';
      Log.info(infoMessage);
    } catch (error) {
      this.handleControllerError(error, req, res, next, 'insertTicket');
    }
  };

  /**
   * Update a ticket.
   */
  public update = async (req: any, res: any, next: any): Promise<void> => {
    try {
      Log.info('update controller reached');

      // Send the response with the appropriate status code and data
      res.status(res.locals.statusCode).send(res.locals);

      if (res.locals.statusCode === 404) {
        Log.error(`update controller exiting. Ticket# ${req.params.id} not found`);
      }

      Log.info('update controller exiting');
    } catch (error) {
      this.handleControllerError(error, req, res, next, 'update');
    }
  };

  /**
   * Handle errors that occur within the controller.
   * @param error - The error object.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next middleware function.
   * @param controller - The name of the controller where the error occurred.
   */
  private handleControllerError = (error: any, req: any, res: any, next: any, controller: string): void => {
    Log.error(`Error in ${controller} controller: ${error}`);

    // Send a generic error response with a 500 status code
    res.status(500).send({ message: 'Internal Server Error.' });

    // Pass the error to the next middleware
    next(error);
  };
}

export default new TicketController();
