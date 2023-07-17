import TicketModel from '../models/ticket-model';
import { Log } from '../utils/logger';

class TicketMiddleware {
  private handleError = (error: Error, req: any, res: any, next: any, middleware: string): void => {
    // Log the error and pass it to the next middleware
    Log.error(`Error in ${middleware}: ${error}`);
    next(error);
  };

  private ticketModel = TicketModel;

  /**
   * Middleware to list all tickets.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next middleware function.
   */
  public listAllTickets = async (req: any, res: any, next: any): Promise<void> => {
    try {
      Log.info('listAllTickets middleware called');

      // Retrieve all tickets from the ticket model
      const allTickets = await this.ticketModel.getAllTickets();

      const success = true;
      const statusCode = 200;
      res.locals = { success, statusCode, data: { count: allTickets.length || 0, tickets: allTickets } };

      Log.info('listAllTickets middleware exiting');
      next();
    } catch (error) {
      this.handleError(error, req, res, next, 'listAllTickets');
    }
  };

  /**
   * Middleware to create a new ticket.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next middleware function.
   */
  public createTicket = async (req: any, res: any, next: any): Promise<void> => {
    try {
      const { client: requestClient, issue: requestIssue } = req.body;
      let infoMessage = 'createTicket middleware called';
      infoMessage += requestClient ? ` for client: ${requestClient}` : ' for a "random client"';
      Log.info(infoMessage);

      // Insert a new ticket using the ticket model
      const ticket = await this.ticketModel.insertTicket(requestClient, requestIssue);

      const success = true;
      const statusCode = 201;
      const message = 'Ticket created';
      const { ticket: ticketId, client, issue, status, deadline, date } = ticket;
      res.locals = { success, statusCode, message, ticket: ticketId, client, issue, status, deadline, date };

      Log.info(`createTicket middleware exiting. Ticket "${ticketId}" created`);

      next();
    } catch (error) {
      this.handleError(error, req, res, next, 'createTicket');
    }
  };

  /**
   * Middleware to update a ticket.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next middleware function.
   */
  public updateTicket = async (req: any, res: any, next: any): Promise<void> => {
    try {
      const ticket = req.params.id;
      Log.info(`updateTicket middleware called for ticket: ${ticket}`);

      const { issue, status } = req.body;

      // Update the ticket using the ticket model
      const updatedTicket = await this.ticketModel.updateTicket(ticket, issue, status);

      if (!updatedTicket) {
        const success = false;
        const statusCode = 404;
        const message = 'Ticket not found';
        res.locals = { success, statusCode, message };

        Log.warn(`updateTicket middleware failed. Reason: "${message}"`);
      } else {
        const success = true;
        const statusCode = 200;
        const message = 'Ticket updated';
        const { ticket: ticketId, client, issue, status, deadline, date } = updatedTicket;
        res.locals = { success, statusCode, message, ticket: ticketId, client, issue, status, deadline, date };

        Log.info(`updateTicket middleware exiting. Ticket "${ticketId}" updated`);
      }

      next();
    } catch (error) {
      this.handleError(error, req, res, next, 'updateTicket');
    }
  };
}

export default new TicketMiddleware();
