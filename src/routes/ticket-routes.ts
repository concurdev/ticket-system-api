import express from 'express';
import ticketMiddleware from '../middleware/ticket-middleware';
import errorMiddleware from '../middleware/error-middleware';
import ticketController from '../controllers/ticket-controller';

const router = express.Router();

router
  /**
   * Route to list all tickets.
   * Middleware: ticketMiddleware.listAllTickets.
   * Controller: ticketController.getAllTickets.
   */
  .get('/tickets', [ticketMiddleware.listAllTickets], ticketController.getAllTickets)

  /**
   * Route to insert a new ticket.
   * Middleware: ticketMiddleware.createTicket.
   * Controller: ticketController.insertTicket.
   */
  .post('/tickets', [ticketMiddleware.createTicket], ticketController.insertTicket)

  /**
   * Route to update a ticket.
   * Middleware: ticketMiddleware.updateTicket.
   * Controller: ticketController.update.
   */
  .put('/tickets/:id', [ticketMiddleware.updateTicket], ticketController.update)

  /**
   * Error handling middleware.
   * Middleware: errorMiddleware.handleError.
   */
  .use(errorMiddleware.handleError);

export default router;
